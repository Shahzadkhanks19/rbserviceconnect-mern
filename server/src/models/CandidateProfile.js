import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  title:{type:String,trim:true,maxlength:120}, company:{type:String,trim:true,maxlength:120}, location:{type:String,trim:true,maxlength:120}, startDate:{type:String,trim:true,maxlength:20}, endDate:{type:String,trim:true,maxlength:20}, current:{type:Boolean,default:false}, description:{type:String,trim:true,maxlength:1200}
},{_id:true});
const educationSchema = new mongoose.Schema({
  institution:{type:String,trim:true,maxlength:160}, degree:{type:String,trim:true,maxlength:160}, field:{type:String,trim:true,maxlength:160}, startYear:{type:String,trim:true,maxlength:10}, endYear:{type:String,trim:true,maxlength:10}
},{_id:true});

const candidateProfileSchema = new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,unique:true,index:true},
  headline:{type:String,trim:true,maxlength:160,default:''}, phone:{type:String,trim:true,maxlength:30,default:''}, location:{type:String,trim:true,maxlength:120,default:''}, bio:{type:String,trim:true,maxlength:2000,default:''},
  portfolioUrl:{type:String,trim:true,maxlength:500,default:''}, linkedinUrl:{type:String,trim:true,maxlength:500,default:''},
  skills:{type:[String],default:[]}, experience:{type:[experienceSchema],default:[]}, education:{type:[educationSchema],default:[]},
  preferences:{
    jobTypes:{type:[String],default:[]}, workplaces:{type:[String],default:[]}, preferredLocations:{type:[String],default:[]}, minimumSalary:{type:String,trim:true,maxlength:60,default:''}, openToWork:{type:Boolean,default:true}
  },
  resume:{name:{type:String,trim:true,maxlength:255,default:''},url:{type:String,trim:true,maxlength:1000,default:''},publicId:{type:String,trim:true,maxlength:500,default:''},source:{type:String,enum:['','url','upload'],default:''},updatedAt:{type:Date,default:null}},
  savedJobs:{type:[String],default:[]}
},{timestamps:true});

export default mongoose.model('CandidateProfile',candidateProfileSchema);
