import mongoose from 'mongoose';

const platformSettingsSchema=new mongoose.Schema({
  key:{type:String,required:true,unique:true,default:'default'},
  recruiterRegistrationOpen:{type:Boolean,default:true},
  candidateRegistrationOpen:{type:Boolean,default:true},
  requireRecruiterApproval:{type:Boolean,default:true},
  maintenanceMode:{type:Boolean,default:false},
  supportMessage:{type:String,trim:true,maxlength:300,default:''},
},{timestamps:true});

export default mongoose.model('PlatformSettings',platformSettingsSchema);
