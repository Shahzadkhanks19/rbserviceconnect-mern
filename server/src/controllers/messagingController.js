import Application from '../models/Application.js';
import CandidateProfile from '../models/CandidateProfile.js';
import Conversation from '../models/Conversation.js';
import Job from '../models/Job.js';
import Message from '../models/Message.js';
import { createNotification } from '../services/notificationService.js';

function accessFilter(user){return user.role==='recruiter'?{recruiter:user._id}:{candidate:user._id};}
async function getAccessibleConversation(user,id){return Conversation.findOne({_id:id,...accessFilter(user)});}

export async function listConversations(req,res){
  const conversations=await Conversation.find(accessFilter(req.user)).sort({lastMessageAt:-1}).populate('recruiter','firstName lastName email').populate('candidate','firstName lastName email').populate('job','title slug').lean();
  const ids=conversations.map((item)=>item._id);const unread=ids.length?await Message.aggregate([{$match:{conversation:{$in:ids},sender:{$ne:req.user._id},readAt:null}},{$group:{_id:'$conversation',count:{$sum:1}}}]):[];const unreadMap=new Map(unread.map((item)=>[String(item._id),item.count]));
  return res.json({conversations:conversations.map((item)=>({...item,unreadCount:unreadMap.get(String(item._id))||0}))});
}

export async function startConversation(req,res){
  if(req.user.role!=='recruiter')return res.status(403).json({message:'Only recruiters can start a new conversation.'});
  const candidateId=String(req.body.candidateId||'');const jobId=String(req.body.jobId||'')||null;
  const profile=await CandidateProfile.findOne({user:candidateId,'privacy.discoverableToRecruiters':{$ne:false},'privacy.recruiterMessagesEnabled':{$ne:false}});if(!profile)return res.status(403).json({message:'This candidate is not available for recruiter messages.'});
  if(jobId){const job=await Job.findOne({_id:jobId,createdBy:req.user._id});if(!job)return res.status(403).json({message:'You can only start job-linked conversations for your own roles.'});}
  let conversation=await Conversation.findOne({recruiter:req.user._id,candidate:candidateId,job:jobId});if(!conversation)conversation=await Conversation.create({recruiter:req.user._id,candidate:candidateId,job:jobId});
  return res.status(201).json({message:'Conversation ready.',conversation});
}

export async function listMessages(req,res){const conversation=await getAccessibleConversation(req.user,req.params.id);if(!conversation)return res.status(404).json({message:'Conversation not found.'});await Message.updateMany({conversation:conversation._id,sender:{$ne:req.user._id},readAt:null},{$set:{readAt:new Date()}});const messages=await Message.find({conversation:conversation._id}).sort({createdAt:1}).populate('sender','firstName lastName role').lean();return res.json({conversation,messages});}

export async function sendMessage(req,res){
  const body=String(req.body.body||'').trim();if(!body)return res.status(400).json({message:'Message cannot be empty.'});
  const conversation=await getAccessibleConversation(req.user,req.params.id);if(!conversation)return res.status(404).json({message:'Conversation not found.'});
  const message=await Message.create({conversation:conversation._id,sender:req.user._id,body});conversation.lastMessageAt=new Date();conversation.lastMessagePreview=body.slice(0,240);await conversation.save();
  const recipient=String(req.user._id)===String(conversation.recruiter)?conversation.candidate:conversation.recruiter;
  await createNotification({user:recipient,type:'message',title:'New message',message:`${req.user.firstName} ${req.user.lastName}: ${body.slice(0,180)}`,link:req.user.role==='recruiter'?'/candidate/messages':'/recruiter/messages',metadata:{conversationId:conversation._id}});
  return res.status(201).json({message:'Message sent.',item:message});
}

export async function startApplicationConversation(req,res){
  if(req.user.role!=='recruiter')return res.status(403).json({message:'Only recruiters can start applicant conversations.'});const application=await Application.findById(req.params.applicationId).populate('job');if(!application||!application.job||String(application.job.createdBy)!==String(req.user._id))return res.status(404).json({message:'Application not found.'});
  let conversation=await Conversation.findOne({recruiter:req.user._id,candidate:application.candidate,job:application.job._id});if(!conversation)conversation=await Conversation.create({recruiter:req.user._id,candidate:application.candidate,job:application.job._id,application:application._id});
  return res.status(201).json({message:'Applicant conversation ready.',conversation});
}
