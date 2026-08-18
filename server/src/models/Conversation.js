import mongoose from 'mongoose';

const conversationSchema=new mongoose.Schema({
  recruiter:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},
  candidate:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},
  job:{type:mongoose.Schema.Types.ObjectId,ref:'Job',default:null,index:true},
  application:{type:mongoose.Schema.Types.ObjectId,ref:'Application',default:null,index:true},
  archivedBy:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
  lastMessageAt:{type:Date,default:Date.now,index:true},
  lastMessagePreview:{type:String,trim:true,maxlength:240,default:''}
},{timestamps:true});
conversationSchema.index({recruiter:1,candidate:1,job:1},{unique:true});
export default mongoose.model('Conversation',conversationSchema);
