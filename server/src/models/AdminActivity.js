import mongoose from 'mongoose';

const adminActivitySchema = new mongoose.Schema({
  admin:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},
  action:{type:String,required:true,trim:true,maxlength:120,index:true},
  entityType:{type:String,trim:true,maxlength:60,default:''},
  entityId:{type:String,trim:true,maxlength:120,default:''},
  description:{type:String,required:true,trim:true,maxlength:500},
  metadata:{type:mongoose.Schema.Types.Mixed,default:{}},
},{timestamps:true});

export default mongoose.model('AdminActivity',adminActivitySchema);
