import mongoose from 'mongoose';

const promotionSchema=new mongoose.Schema({
  owner:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},
  audience:{type:String,enum:['candidate','recruiter'],required:true,index:true},
  product:{type:String,enum:['candidate-profile-boost','job-featured','job-search-boost','job-urgent'],required:true,index:true},
  targetType:{type:String,enum:['candidate-profile','job'],required:true},
  target:{type:mongoose.Schema.Types.ObjectId,required:true,index:true},
  durationDays:{type:Number,required:true,min:1,max:90},
  amount:{type:Number,required:true,min:0},
  currency:{type:String,enum:['INR'],default:'INR'},
  status:{type:String,enum:['pending','active','expired','cancelled'],default:'pending',index:true},
  startsAt:{type:Date,default:null},
  endsAt:{type:Date,default:null,index:true},
  payment:{provider:{type:String,trim:true,maxlength:40,default:''},orderId:{type:String,trim:true,maxlength:180,default:'',index:true},paymentId:{type:String,trim:true,maxlength:180,default:'',index:true},paidAt:{type:Date,default:null}},
},{timestamps:true});
promotionSchema.index({owner:1,status:1,createdAt:-1});promotionSchema.index({target:1,status:1,endsAt:-1});promotionSchema.index({product:1,status:1,endsAt:-1});
export default mongoose.model('Promotion',promotionSchema);
