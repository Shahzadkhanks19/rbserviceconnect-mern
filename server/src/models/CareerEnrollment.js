import mongoose from 'mongoose';

const careerEnrollmentSchema=new mongoose.Schema({
  candidate:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},
  program:{type:String,enum:['career-assist','career-pro','career-elite'],required:true,index:true},
  status:{type:String,enum:['active','placed','completed','withdrawn','cancelled'],default:'active',index:true},
  successFeeAmount:{type:Number,required:true,min:0},currency:{type:String,enum:['INR'],default:'INR'},
  termsVersion:{type:String,required:true},acceptedAt:{type:Date,required:true},
  paymentPreference:{type:String,enum:['full','3-installments','6-installments'],default:'full'},
  services:{resumeReview:{type:Boolean,default:false},profileOptimization:{type:Boolean,default:false},curatedMatching:{type:Boolean,default:false},interviewPrep:{type:Boolean,default:false},mockInterview:{type:Boolean,default:false},recruiterIntroductions:{type:Boolean,default:false},salaryNegotiation:{type:Boolean,default:false},advisorSupport:{type:Boolean,default:false}},
  placedApplication:{type:mongoose.Schema.Types.ObjectId,ref:'Application',default:null,index:true},placedAt:{type:Date,default:null},
},{timestamps:true});
careerEnrollmentSchema.index({candidate:1,status:1,createdAt:-1});
export default mongoose.model('CareerEnrollment',careerEnrollmentSchema);
