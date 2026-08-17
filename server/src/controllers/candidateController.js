import Application from '../models/Application.js';
import CandidateProfile from '../models/CandidateProfile.js';
import User from '../models/User.js';
import { getJobBySlug, jobs } from '../data/jobs.js';

const cleanArray=(value,max=30)=>Array.isArray(value)?value.map((item)=>String(item).trim()).filter(Boolean).slice(0,max):[];
const sanitizeProfile=(body={})=>({
  headline:String(body.headline||'').trim(),phone:String(body.phone||'').trim(),location:String(body.location||'').trim(),bio:String(body.bio||'').trim(),portfolioUrl:String(body.portfolioUrl||'').trim(),linkedinUrl:String(body.linkedinUrl||'').trim(),
  skills:cleanArray(body.skills,40),
  experience:Array.isArray(body.experience)?body.experience.slice(0,20).map((item)=>({title:String(item.title||'').trim(),company:String(item.company||'').trim(),location:String(item.location||'').trim(),startDate:String(item.startDate||'').trim(),endDate:String(item.endDate||'').trim(),current:Boolean(item.current),description:String(item.description||'').trim()})):[],
  education:Array.isArray(body.education)?body.education.slice(0,20).map((item)=>({institution:String(item.institution||'').trim(),degree:String(item.degree||'').trim(),field:String(item.field||'').trim(),startYear:String(item.startYear||'').trim(),endYear:String(item.endYear||'').trim()})):[],
  preferences:{jobTypes:cleanArray(body.preferences?.jobTypes,10),workplaces:cleanArray(body.preferences?.workplaces,10),preferredLocations:cleanArray(body.preferences?.preferredLocations,15),minimumSalary:String(body.preferences?.minimumSalary||'').trim(),openToWork:body.preferences?.openToWork!==false}
});

function completion(profile,user){const checks=[user.firstName,user.lastName,profile?.headline,profile?.phone,profile?.location,profile?.bio,profile?.skills?.length,profile?.experience?.length,profile?.education?.length,profile?.resume?.url,profile?.preferences?.jobTypes?.length,profile?.preferences?.workplaces?.length];return Math.round((checks.filter(Boolean).length/checks.length)*100);}
async function getOrCreateProfile(userId){return CandidateProfile.findOneAndUpdate({user:userId},{$setOnInsert:{user:userId}},{new:true,upsert:true,setDefaultsOnInsert:true});}

export async function getOverview(req,res){
  const userId=req.user._id;
  const [profile,recentApplications,totalApplications,activeApplications,interviews]=await Promise.all([
    getOrCreateProfile(userId),
    Application.find({candidate:userId}).sort({updatedAt:-1}).limit(4).lean(),
    Application.countDocuments({candidate:userId}),
    Application.countDocuments({candidate:userId,status:{$nin:['rejected','withdrawn','hired']}}),
    Application.countDocuments({candidate:userId,status:'interview'}),
  ]);
  const savedJobs=(profile.savedJobs||[]).map(getJobBySlug).filter(Boolean);
  return res.json({profileCompletion:completion(profile,req.user),counts:{activeApplications,savedJobs:savedJobs.length,interviews,totalApplications},recentApplications,savedJobs:savedJobs.slice(0,4),profile});
}

export async function getProfile(req,res){const profile=await getOrCreateProfile(req.user._id);return res.json({profile,completion:completion(profile,req.user)});}
export async function updateProfile(req,res){const profile=await CandidateProfile.findOneAndUpdate({user:req.user._id},{$set:sanitizeProfile(req.body)},{new:true,upsert:true,runValidators:true,setDefaultsOnInsert:true});return res.json({message:'Profile updated.',profile,completion:completion(profile,req.user)});}
export async function updateResume(req,res){const name=String(req.body.name||'').trim();const url=String(req.body.url||'').trim();if(!name||!url)return res.status(400).json({message:'Resume name and URL are required.'});try{new URL(url);}catch{return res.status(400).json({message:'Enter a valid resume URL.'});}const profile=await CandidateProfile.findOneAndUpdate({user:req.user._id},{$set:{resume:{name,url,updatedAt:new Date()}}},{new:true,upsert:true,runValidators:true,setDefaultsOnInsert:true});return res.json({message:'Resume updated.',resume:profile.resume});}
export async function deleteResume(req,res){const profile=await getOrCreateProfile(req.user._id);profile.resume={name:'',url:'',updatedAt:null};await profile.save();return res.json({message:'Resume removed.'});}
export async function getSavedJobs(req,res){const profile=await getOrCreateProfile(req.user._id);return res.json({jobs:(profile.savedJobs||[]).map(getJobBySlug).filter(Boolean)});}
export async function saveJob(req,res){const job=getJobBySlug(req.params.slug);if(!job)return res.status(404).json({message:'Job not found.'});const profile=await getOrCreateProfile(req.user._id);if(!profile.savedJobs.includes(job.slug)){profile.savedJobs.push(job.slug);await profile.save();}return res.json({message:'Job saved.',savedJobs:profile.savedJobs});}
export async function unsaveJob(req,res){const profile=await getOrCreateProfile(req.user._id);profile.savedJobs=profile.savedJobs.filter((slug)=>slug!==req.params.slug);await profile.save();return res.json({message:'Job removed from saved jobs.',savedJobs:profile.savedJobs});}
export async function listApplications(req,res){const applications=await Application.find({candidate:req.user._id}).sort({createdAt:-1}).lean();return res.json({applications});}
export async function createApplication(req,res){const job=getJobBySlug(String(req.body.jobSlug||''));if(!job)return res.status(404).json({message:'Job not found.'});const existing=await Application.findOne({candidate:req.user._id,jobSlug:job.slug});if(existing)return res.status(409).json({message:'You have already applied for this job.'});const profile=await getOrCreateProfile(req.user._id);const application=await Application.create({candidate:req.user._id,jobSlug:job.slug,jobSnapshot:job,resumeUrl:profile.resume?.url||'',coverLetter:String(req.body.coverLetter||'').trim()});return res.status(201).json({message:'Application submitted.',application});}
export async function withdrawApplication(req,res){const application=await Application.findOne({_id:req.params.id,candidate:req.user._id});if(!application)return res.status(404).json({message:'Application not found.'});if(['hired','rejected','withdrawn'].includes(application.status))return res.status(400).json({message:'This application can no longer be withdrawn.'});application.status='withdrawn';application.withdrawnAt=new Date();application.statusHistory.push({status:'withdrawn',note:'Application withdrawn by candidate.',changedBy:req.user._id});await application.save();return res.json({message:'Application withdrawn.',application});}
export async function getRecommendedJobs(req,res){const profile=await getOrCreateProfile(req.user._id);const appliedSlugs=new Set((await Application.find({candidate:req.user._id}).select('jobSlug').lean()).map((item)=>item.jobSlug));const preferredWorkplaces=new Set((profile.preferences?.workplaces||[]).map((item)=>item.toLowerCase()));const ranked=jobs.filter((job)=>!appliedSlugs.has(job.slug)).map((job)=>({job,score:(preferredWorkplaces.has(job.workplace.toLowerCase())?2:0)+(job.skills.some((skill)=>(profile.skills||[]).some((candidateSkill)=>candidateSkill.toLowerCase()===skill.toLowerCase()))?3:0)})).sort((a,b)=>b.score-a.score).slice(0,4).map(({job})=>job);return res.json({jobs:ranked});}
export async function updateAccount(req,res){const firstName=String(req.body.firstName||'').trim();const lastName=String(req.body.lastName||'').trim();if(firstName.length<2||lastName.length<2)return res.status(400).json({message:'First and last name must be at least 2 characters.'});const user=await User.findByIdAndUpdate(req.user._id,{$set:{firstName,lastName}},{new:true,runValidators:true}).select('-password');return res.json({message:'Account updated.',user});}
export async function changePassword(req,res){const currentPassword=String(req.body.currentPassword||'');const newPassword=String(req.body.newPassword||'');if(newPassword.length<8)return res.status(400).json({message:'New password must be at least 8 characters.'});const user=await User.findById(req.user._id).select('+password');if(!user||!(await user.comparePassword(currentPassword)))return res.status(400).json({message:'Current password is incorrect.'});user.password=newPassword;await user.save();return res.json({message:'Password changed successfully.'});}
