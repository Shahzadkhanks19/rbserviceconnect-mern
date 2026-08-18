import mongoose from 'mongoose';

const successFeeSchema=new mongoose.Schema({
  application:{type:mongoose.Schema.Types.ObjectId,ref:'Application',required:true,unique:true,index:true},job:{type:mongoose.Schema.Types.ObjectId,ref:'Job',required:true,index:true},candidate:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},recruiter:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},company:{type:mongoose.Schema.Types.ObjectId,ref:'Company',required:true,index:true},
  status:{type:String,enum:['awaiting_hire_confirmation','awaiting_candidate_confirmation','awaiting_first_salary','payment_due','paid','disputed','waived','cancelled'],default:'awaiting_hire_confirmation',index:true},
  feePercent:{type:Number,default:10,min:0,max:100},firstSalaryAmount:{type:Number,default:0,min:0},feeAmount:{type:Number,default:0,min:0},currency:{type:String,enum:['INR'],default:'INR'},
  recruiterConfirmation:{confirmed:{type:Boolean,default:false},salaryAmount:{type:Number,default:0,min:0},startDate:{type:Date,default:null},confirmedAt:{type:Date,default:null}},
  candidateConfirmation:{confirmed:{type:Boolean,default:false},salaryAmount:{type:Number,default:0,min:0},startDate:{type:Date,default:null},confirmedAt:{type:Date,default:null}},
  firstSalary:{received:{type:Boolean,default:false},receivedAt:{type:Date,default:null},confirmedAt:{type:Date,default:null}},
  dispute:{reason:{type:String,maxlength:1000,default:''},openedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User',default:null},openedAt:{type:Date,default:null},resolvedAt:{type:Date,default:null},resolution:{type:String,maxlength:1000,default:''}},
  payment:{provider:{type:String,default:'razorpay'},orderId:{type:String,maxlength:180,default:''},paymentId:{type:String,maxlength:180,default:''},paidAt:{type:Date,default:null}},
},{timestamps:true});
successFeeSchema.index({candidate:1,status:1,createdAt:-1});successFeeSchema.index({recruiter:1,status:1,createdAt:-1});successFeeSchema.index({status:1,createdAt:-1});
export default mongoose.model('SuccessFee',successFeeSchema);
