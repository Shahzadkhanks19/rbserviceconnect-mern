import mongoose from 'mongoose';

const attachmentSchema=new mongoose.Schema({name:{type:String,trim:true,maxlength:180},url:{type:String,trim:true,maxlength:1000},publicId:{type:String,trim:true,maxlength:500},mimeType:{type:String,trim:true,maxlength:100},size:{type:Number,min:0,max:4*1024*1024}},{_id:false});
const messageSchema=new mongoose.Schema({
  conversation:{type:mongoose.Schema.Types.ObjectId,ref:'Conversation',required:true,index:true},
  sender:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},
  body:{type:String,trim:true,maxlength:4000,default:''},
  attachment:{type:attachmentSchema,default:null},
  readAt:{type:Date,default:null,index:true}
},{timestamps:true});
messageSchema.index({conversation:1,createdAt:1});
messageSchema.index({conversation:1,readAt:1,sender:1});
export default mongoose.model('Message',messageSchema);
