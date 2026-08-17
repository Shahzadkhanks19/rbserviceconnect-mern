import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  firstName:{type:String,required:true,trim:true,maxlength:60},
  lastName:{type:String,required:true,trim:true,maxlength:60},
  email:{type:String,required:true,unique:true,lowercase:true,trim:true,index:true},
  password:{type:String,required:true,minlength:8,select:false},
  role:{type:String,enum:['candidate','recruiter','admin'],default:'candidate',index:true},
  status:{type:String,enum:['active','suspended','pending'],default:'active'},
  emailVerified:{type:Boolean,default:false},
  lastLoginAt:{type:Date,default:null}
},{timestamps:true});

userSchema.pre('save',async function(){if(!this.isModified('password')) return;this.password=await bcrypt.hash(this.password,12);});
userSchema.methods.comparePassword=function(candidate){return bcrypt.compare(candidate,this.password);};

export default mongoose.model('User',userSchema);
