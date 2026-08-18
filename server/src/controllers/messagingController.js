import crypto from 'node:crypto';
import mongoose from 'mongoose';
import Application from '../models/Application.js';
import CandidateProfile from '../models/CandidateProfile.js';
import Conversation from '../models/Conversation.js';
import Job from '../models/Job.js';
import Message from '../models/Message.js';
import { createNotification } from '../services/notificationService.js';

function accessFilter(user){return user.role==='recruiter'?{recruiter:user._id}:{candidate:user._id};}
async function getAccessibleConversation(user,id){if(!mongoose.isValidObjectId(id))return null;return Conversation.findOne({_id:id,...accessFilter(user)});}
function cloudinaryConfig(){const {CLOUDINARY_CLOUD_NAME:cloudName,CLOUDINARY_API_KEY:apiKey,CLOUDINARY_API_SECRET:apiSecret}=process.env;return cloudName&&apiKey&&apiSecret?{cloudName,apiKey,apiSecret}:null;}
function signature(params,secret){const value=Object.entries(params).sort(([a],[b])=>a.localeCompare(b)).map(([key,val])=>`${key}=${val}`).join('&');return crypto.createHash('sha1').update(`${value}${secret}`).digest('hex');}
function pageSize(value,fallback,max){const number=Number.parseInt(value,10);return Number.isFinite(number)?Math.min(Math.max(number,1),max):fallback;}
async function uploadAttachment(input,userId){if(!input)return null;const config=cloudinaryConfig();if(!config){const error=new Error('Message attachments are not configured yet.');error.status=503;throw error;}const name=String(input.name||'').trim();const dataUrl=String(input.dataUrl||'');const match=dataUrl.match(/^data:(application\/pdf|image\/(?:jpeg|png|webp));base64,/i);if(!name||!match){const error=new Error('Only PDF, JPG, PNG, and WebP attachments are allowed.');error.status=400;throw error;}const encoded=dataUrl.split(',')[1]||'';const size=Math.ceil(encoded.length*3/4);if(size>4*1024*1024){const error=new Error('Message attachments must be 4 MB or smaller.');error.status=413;throw error;}const timestamp=Math.floor(Date.now()/1000);const folder='rb-service-connect/message-attachments';const publicId=`message-${userId}-${Date.now()}`;const params={folder,public_id:publicId,timestamp};const form=new FormData();form.append('file',dataUrl);form.append('api_key',config.apiKey);form.append('timestamp',String(timestamp));form.append('folder',folder);form.append('public_id',publicId);form.append('signature',signature(params,config.apiSecret));const response=await fetch(`https://api.cloudinary.com/v1_1/${config.cloudName}/auto/upload`,{method:'POST',body:form});const result=await response.json();if(!response.ok||!result.secure_url){const error=new Error('Attachment upload failed. Please try again.');error.status=502;throw error;}return {name:name.slice(0,180),url:result.secure_url,publicId:result.public_id,mimeType:match[1].toLowerCase(),size};}

export async function listConversations(req,res){
  const showArchived=req.query.archived==='true';const limit=pageSize(req.query.limit,50,100);const filter={...accessFilter(req.user),archivedBy:showArchived?req.user._id:{$ne:req.user._id}};
  const conversations=await Conversation.find(filter).sort({lastMessageAt:-1}).limit(limit).populate('recruiter','firstName lastName email').populate('candidate','firstName lastName email').populate('job','title slug').lean();
  const ids=conversations.map((item)=>item._id);const unread=ids.length?await Message.aggregate([{$match:{conversation:{$in:ids},sender:{$ne:req.user._id},readAt:null}},{$group:{_id:'$conversation',count:{$sum:1}}}]):[];const unreadMap=new Map(unread.map((item)=>[String(item._id),item.count]));
  return res.json({conversations:conversations.map((item)=>({...item,unreadCount:unreadMap.get(String(item._id))||0})),limit});
}

export async function startConversation(req,res){
  if(req.user.role!=='recruiter')return res.status(403).json({message:'Only recruiters can start a new conversation.'});
  const candidateId=String(req.body.candidateId||'');const jobId=String(req.body.jobId||'')||null;if(!mongoose.isValidObjectId(candidateId)||jobId&&!mongoose.isValidObjectId(jobId))return res.status(400).json({message:'Invalid candidate or job reference.'});
  const profile=await CandidateProfile.findOne({user:candidateId,'privacy.discoverableToRecruiters':{$ne:false},'privacy.recruiterMessagesEnabled':{$ne:false}});if(!profile)return res.status(403).json({message:'This candidate is not available for recruiter messages.'});
  if(jobId){const job=await Job.findOne({_id:jobId,createdBy:req.user._id});if(!job)return res.status(403).json({message:'You can only start job-linked conversations for your own roles.'});}
  let conversation=await Conversation.findOne({recruiter:req.user._id,candidate:candidateId,job:jobId});if(!conversation)conversation=await Conversation.create({recruiter:req.user._id,candidate:candidateId,job:jobId});else if(conversation.archivedBy.some((id)=>String(id)===String(req.user._id))){conversation.archivedBy=conversation.archivedBy.filter((id)=>String(id)!==String(req.user._id));await conversation.save();}
  return res.status(201).json({message:'Conversation ready.',conversation});
}

export async function listMessages(req,res){const conversation=await getAccessibleConversation(req.user,req.params.id);if(!conversation)return res.status(404).json({message:'Conversation not found.'});const limit=pageSize(req.query.limit,100,200);const before=req.query.before&&mongoose.isValidObjectId(req.query.before)?await Message.findOne({_id:req.query.before,conversation:conversation._id}).select('createdAt').lean():null;const query={conversation:conversation._id,...(before?{createdAt:{$lt:before.createdAt}}:{})};const readAt=new Date();const result=await Message.updateMany({conversation:conversation._id,sender:{$ne:req.user._id},readAt:null},{$set:{readAt}});const messages=(await Message.find(query).sort({createdAt:-1}).limit(limit+1).populate('sender','firstName lastName role').lean()).reverse();const hasMore=messages.length>limit;if(hasMore)messages.shift();if(result.modifiedCount)req.app.get('io')?.to(`conversation:${conversation._id}`).emit('messages:read',{conversationId:String(conversation._id),readerId:String(req.user._id),readAt});return res.json({conversation,messages,hasMore,nextBefore:hasMore?messages[0]?._id:null:null});}

export async function sendMessage(req,res){
  const body=String(req.body.body||'').trim();if(body.length>4000)return res.status(400).json({message:'Message must be 4,000 characters or fewer.'});if(!body&&!req.body.attachment)return res.status(400).json({message:'Write a message or attach a file.'});
  const conversation=await getAccessibleConversation(req.user,req.params.id);if(!conversation)return res.status(404).json({message:'Conversation not found.'});
  const attachment=await uploadAttachment(req.body.attachment,req.user._id);const message=await Message.create({conversation:conversation._id,sender:req.user._id,body,attachment});const populated=await Message.findById(message._id).populate('sender','firstName lastName role').lean();conversation.lastMessageAt=new Date();conversation.lastMessagePreview=body.slice(0,240)||(attachment?`Attachment: ${attachment.name}`:'New message');conversation.archivedBy=[];await conversation.save();
  const recipient=String(req.user._id)===String(conversation.recruiter)?conversation.candidate:conversation.recruiter;
  await createNotification({user:recipient,type:'message',title:'New message',message:`${req.user.firstName} ${req.user.lastName}: ${body.slice(0,180)||(attachment?`sent ${attachment.name}`:'sent an attachment')}`,link:req.user.role==='recruiter'?'/candidate/messages':'/recruiter/messages',metadata:{conversationId:conversation._id}});
  const io=req.app.get('io');io?.to(`conversation:${conversation._id}`).emit('message:new',{conversationId:String(conversation._id),message:populated});io?.to(`user:${recipient}`).emit('conversation:updated',{conversationId:String(conversation._id)});
  return res.status(201).json({message:'Message sent.',item:populated});
}

export async function archiveConversation(req,res){const conversation=await getAccessibleConversation(req.user,req.params.id);if(!conversation)return res.status(404).json({message:'Conversation not found.'});if(!conversation.archivedBy.some((id)=>String(id)===String(req.user._id)))conversation.archivedBy.push(req.user._id);await conversation.save();return res.json({message:'Conversation archived.'});}
export async function restoreConversation(req,res){const conversation=await getAccessibleConversation(req.user,req.params.id);if(!conversation)return res.status(404).json({message:'Conversation not found.'});conversation.archivedBy=conversation.archivedBy.filter((id)=>String(id)!==String(req.user._id));await conversation.save();return res.json({message:'Conversation restored.'});}

export async function startApplicationConversation(req,res){
  if(req.user.role!=='recruiter')return res.status(403).json({message:'Only recruiters can start applicant conversations.'});if(!mongoose.isValidObjectId(req.params.applicationId))return res.status(400).json({message:'Invalid application reference.'});const application=await Application.findById(req.params.applicationId).populate('job');if(!application||!application.job||String(application.job.createdBy)!==String(req.user._id))return res.status(404).json({message:'Application not found.'});
  let conversation=await Conversation.findOne({recruiter:req.user._id,candidate:application.candidate,job:application.job._id});if(!conversation)conversation=await Conversation.create({recruiter:req.user._id,candidate:application.candidate,job:application.job._id,application:application._id});else{conversation.archivedBy=conversation.archivedBy.filter((id)=>String(id)!==String(req.user._id));await conversation.save();}
  return res.status(201).json({message:'Applicant conversation ready.',conversation});
}
