import mongoose from 'mongoose';
const applicationSchema=new mongoose.Schema({job:{type:mongoose.Schema.Types.ObjectId,ref:'Job',required:true,index:true},candidate:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},resumeUrl:String,coverLetter:{type:String,maxlength:5000},status:{type:String,enum:['applied','reviewing','shortlisted','interview','offered','hired','rejected','withdrawn'],default:'applied',index:true},statusHistory:[{status:String,note:String,changedAt:{type:Date,default:Date.now},changedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'}}]},{timestamps:true});
applicationSchema.index({job:1,candidate:1},{unique:true});
export default mongoose.model('Application',applicationSchema);
