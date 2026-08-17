import mongoose from 'mongoose';
const companySchema=new mongoose.Schema({name:{type:String,required:true,trim:true},slug:{type:String,required:true,unique:true,index:true},owner:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},logoUrl:String,website:String,industry:String,size:String,location:String,description:{type:String,maxlength:5000},verificationStatus:{type:String,enum:['pending','verified','rejected'],default:'pending',index:true}},{timestamps:true});
export default mongoose.model('Company',companySchema);
