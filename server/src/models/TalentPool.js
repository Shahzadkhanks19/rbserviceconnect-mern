import mongoose from 'mongoose';

const poolCandidateSchema=new mongoose.Schema({candidate:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},note:{type:String,trim:true,maxlength:1200,default:''},addedAt:{type:Date,default:Date.now}},{_id:false});
const talentPoolSchema=new mongoose.Schema({
  recruiter:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},
  name:{type:String,required:true,trim:true,maxlength:120},
  description:{type:String,trim:true,maxlength:1000,default:''},
  candidates:{type:[poolCandidateSchema],default:[]}
},{timestamps:true});
talentPoolSchema.index({recruiter:1,name:1},{unique:true});
export default mongoose.model('TalentPool',talentPoolSchema);
