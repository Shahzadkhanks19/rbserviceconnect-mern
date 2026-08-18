import mongoose from 'mongoose';

const jobAlertSchema = new mongoose.Schema({
  candidate:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},
  name:{type:String,required:true,trim:true,maxlength:120},
  keywords:{type:String,trim:true,maxlength:300,default:''},
  location:{type:String,trim:true,maxlength:160,default:''},
  category:{type:String,trim:true,maxlength:100,default:''},
  workMode:{type:String,enum:['','on-site','hybrid','remote'],default:''},
  employmentType:{type:String,enum:['','full-time','part-time','contract','internship','temporary'],default:''},
  frequency:{type:String,enum:['instant','daily','weekly'],default:'daily'},
  emailEnabled:{type:Boolean,default:true},
  inAppEnabled:{type:Boolean,default:true},
  active:{type:Boolean,default:true,index:true},
  lastMatchedAt:{type:Date,default:null}
},{timestamps:true});

jobAlertSchema.index({candidate:1,name:1});
export default mongoose.model('JobAlert',jobAlertSchema);
