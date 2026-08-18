import mongoose from 'mongoose';

const messageSchema=new mongoose.Schema({
  conversation:{type:mongoose.Schema.Types.ObjectId,ref:'Conversation',required:true,index:true},
  sender:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},
  body:{type:String,required:true,trim:true,maxlength:4000},
  readAt:{type:Date,default:null,index:true}
},{timestamps:true});
messageSchema.index({conversation:1,createdAt:1});
export default mongoose.model('Message',messageSchema);
