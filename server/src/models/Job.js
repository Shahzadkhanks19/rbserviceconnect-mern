import mongoose from 'mongoose';
const jobSchema=new mongoose.Schema({
  company:{type:mongoose.Schema.Types.ObjectId,ref:'Company',required:true,index:true},createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},
  title:{type:String,required:true,trim:true,maxlength:160,index:true},slug:{type:String,required:true,unique:true,index:true},summary:{type:String,trim:true,maxlength:500,default:''},description:{type:String,required:true,maxlength:8000},category:{type:String,trim:true,maxlength:80,default:'Other'},experience:{type:String,trim:true,maxlength:80,default:''},
  responsibilities:{type:[String],default:[]},requirements:{type:[String],default:[]},benefits:{type:[String],default:[]},skills:{type:[String],default:[]},
  employmentType:{type:String,enum:['full-time','part-time','contract','internship','temporary'],required:true},workMode:{type:String,enum:['on-site','hybrid','remote'],required:true},location:{city:{type:String,trim:true,maxlength:100},state:{type:String,trim:true,maxlength:100},country:{type:String,default:'India',trim:true,maxlength:100}},
  salary:{min:{type:Number,min:0},max:{type:Number,min:0},currency:{type:String,default:'INR'},period:{type:String,enum:['year','month','hour'],default:'year'}},
  status:{type:String,enum:['draft','published','reviewing','paused','closed'],default:'draft',index:true},featured:{type:Boolean,default:false},applicationDeadline:Date,expiresAt:Date,publishedAt:Date,closedAt:Date
},{timestamps:true});
export default mongoose.model('Job',jobSchema);
