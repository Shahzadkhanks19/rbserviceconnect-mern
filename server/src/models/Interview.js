import mongoose from 'mongoose';

const interviewSchema=new mongoose.Schema({
  application:{type:mongoose.Schema.Types.ObjectId,ref:'Application',required:true,index:true},
  job:{type:mongoose.Schema.Types.ObjectId,ref:'Job',required:true,index:true},
  recruiter:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},
  candidate:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},
  scheduledAt:{type:Date,required:true,index:true},
  durationMinutes:{type:Number,min:15,max:480,default:45},
  mode:{type:String,enum:['video','phone','in-person'],required:true},
  meetingUrl:{type:String,trim:true,maxlength:1000,default:''},
  location:{type:String,trim:true,maxlength:500,default:''},
  instructions:{type:String,trim:true,maxlength:2000,default:''},
  status:{type:String,enum:['scheduled','confirmed','completed','cancelled'],default:'scheduled',index:true},
  candidateResponse:{type:String,enum:['pending','accepted','declined'],default:'pending'},
  recruiterNotes:{type:String,trim:true,maxlength:3000,default:''}
},{timestamps:true});
interviewSchema.index({candidate:1,scheduledAt:1});
interviewSchema.index({recruiter:1,scheduledAt:1});
export default mongoose.model('Interview',interviewSchema);
