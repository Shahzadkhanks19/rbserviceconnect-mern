import mongoose from 'mongoose';

const jobSnapshotSchema=new mongoose.Schema({slug:String,title:String,company:String,initials:String,location:String,workplace:String,type:String,experience:String,salary:String,category:String},{_id:false});
const historySchema=new mongoose.Schema({status:String,note:{type:String,maxlength:500},changedAt:{type:Date,default:Date.now},changedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'}},{_id:false});

const applicationSchema=new mongoose.Schema({
  job:{type:mongoose.Schema.Types.ObjectId,ref:'Job',default:null,index:true},
  jobSlug:{type:String,required:true,index:true},
  jobSnapshot:{type:jobSnapshotSchema,required:true},
  candidate:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},
  resumeUrl:{type:String,maxlength:1000,default:''},
  coverLetter:{type:String,maxlength:5000,default:''},
  status:{type:String,enum:['applied','reviewing','shortlisted','interview','offered','hired','rejected','withdrawn'],default:'applied',index:true},
  statusHistory:{type:[historySchema],default:()=>[{status:'applied',note:'Application submitted.'}]},
  withdrawnAt:{type:Date,default:null}
},{timestamps:true});

applicationSchema.index({candidate:1,jobSlug:1},{unique:true});
applicationSchema.index({candidate:1,createdAt:-1});
applicationSchema.index({job:1,status:1,createdAt:-1});
applicationSchema.index({status:1,createdAt:-1});
export default mongoose.model('Application',applicationSchema);
