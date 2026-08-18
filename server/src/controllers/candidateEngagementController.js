import CandidateProfile from '../models/CandidateProfile.js';
import JobAlert from '../models/JobAlert.js';
import { listUserNotifications, markAllNotificationsRead, markNotificationRead } from '../services/notificationService.js';

const clean=(value='')=>String(value).trim();
const allowedWorkModes=['','on-site','hybrid','remote'];
const allowedTypes=['','full-time','part-time','contract','internship','temporary'];
const allowedFrequencies=['instant','daily','weekly'];

async function profileFor(userId){return CandidateProfile.findOneAndUpdate({user:userId},{$setOnInsert:{user:userId}},{new:true,upsert:true,setDefaultsOnInsert:true});}
function alertPayload(body={}){
  return {
    name:clean(body.name).slice(0,120),keywords:clean(body.keywords).slice(0,300),location:clean(body.location).slice(0,160),category:clean(body.category).slice(0,100),
    workMode:allowedWorkModes.includes(body.workMode)?body.workMode:'',employmentType:allowedTypes.includes(body.employmentType)?body.employmentType:'',
    frequency:allowedFrequencies.includes(body.frequency)?body.frequency:'daily',emailEnabled:body.emailEnabled!==false,inAppEnabled:body.inAppEnabled!==false,active:body.active!==false,
  };
}

export async function listJobAlerts(req,res){const alerts=await JobAlert.find({candidate:req.user._id}).sort({createdAt:-1}).lean();return res.json({alerts});}
export async function createJobAlert(req,res){const payload=alertPayload(req.body);if(payload.name.length<2)return res.status(400).json({message:'Give this job alert a name.'});if(!payload.keywords&&!payload.location&&!payload.category&&!payload.workMode&&!payload.employmentType)return res.status(400).json({message:'Add at least one matching condition to the alert.'});const alert=await JobAlert.create({...payload,candidate:req.user._id});return res.status(201).json({message:'Job alert created.',alert});}
export async function updateJobAlert(req,res){const payload=alertPayload(req.body);if(payload.name.length<2)return res.status(400).json({message:'Give this job alert a name.'});const alert=await JobAlert.findOneAndUpdate({_id:req.params.id,candidate:req.user._id},{$set:payload},{new:true,runValidators:true});if(!alert)return res.status(404).json({message:'Job alert not found.'});return res.json({message:'Job alert updated.',alert});}
export async function deleteJobAlert(req,res){const alert=await JobAlert.findOneAndDelete({_id:req.params.id,candidate:req.user._id});if(!alert)return res.status(404).json({message:'Job alert not found.'});return res.json({message:'Job alert deleted.'});}

export async function getNotifications(req,res){return res.json(await listUserNotifications(req.user._id,{limit:req.query.limit}));}
export async function readNotification(req,res){const notification=await markNotificationRead(req.user._id,req.params.id);if(!notification)return res.status(404).json({message:'Notification not found.'});return res.json({message:'Notification marked as read.',notification});}
export async function readAllNotifications(req,res){const count=await markAllNotificationsRead(req.user._id);return res.json({message:'Notifications marked as read.',count});}

export async function getPrivacy(req,res){const profile=await profileFor(req.user._id);return res.json({privacy:profile.privacy});}
export async function updatePrivacy(req,res){const profile=await profileFor(req.user._id);profile.privacy={discoverableToRecruiters:req.body.discoverableToRecruiters!==false,showResumeToRecruiters:req.body.showResumeToRecruiters!==false,jobAlertsEnabled:req.body.jobAlertsEnabled!==false,recruiterMessagesEnabled:req.body.recruiterMessagesEnabled!==false};await profile.save();return res.json({message:'Privacy preferences updated.',privacy:profile.privacy});}
