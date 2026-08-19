import mongoose from 'mongoose';
import CandidateProfile from '../models/CandidateProfile.js';
import Promotion from '../models/Promotion.js';
import { listUserNotifications, markAllNotificationsRead, markNotificationRead } from '../services/notificationService.js';

function escapeRegExp(value=''){return String(value).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
function text(value,max){return String(value||'').trim().slice(0,max);}
const workplaces=new Set(['on-site','hybrid','remote']);
const jobTypes=new Set(['full-time','part-time','contract','internship','temporary']);
export async function searchCandidates(req,res){
  const q=text(req.query.q,120),location=text(req.query.location,120),skill=text(req.query.skill,80),workplace=text(req.query.workplace,30),jobType=text(req.query.jobType,30),openOnly=req.query.openOnly!=='false',limit=Math.min(Math.max(Number.parseInt(req.query.limit,10)||30,1),100);
  if(workplace&&!workplaces.has(workplace))return res.status(400).json({message:'Invalid workplace filter.'});
  if(jobType&&!jobTypes.has(jobType))return res.status(400).json({message:'Invalid job type filter.'});
  const filter={'privacy.discoverableToRecruiters':{$ne:false}};
  if(openOnly)filter['preferences.openToWork']=true;
  if(location)filter.location={$regex:escapeRegExp(location),$options:'i'};
  if(skill)filter.skills={$elemMatch:{$regex:escapeRegExp(skill),$options:'i'}};
  if(workplace)filter['preferences.workplaces']=workplace;
  if(jobType)filter['preferences.jobTypes']=jobType;
  if(q){const rx={$regex:escapeRegExp(q),$options:'i'};filter.$or=[{headline:rx},{bio:rx},{skills:{$elemMatch:rx}},{'experience.title':rx},{'experience.company':rx},{'education.degree':rx},{'education.field':rx}];}
  const profiles=await CandidateProfile.find(filter).sort({updatedAt:-1}).limit(100).populate({path:'user',match:{role:'candidate',status:'active',emailVerified:true},select:'firstName lastName'}).lean();
  const visible=profiles.filter((profile)=>profile.user);const now=new Date();const boosts=visible.length?await Promotion.find({target:{$in:visible.map((profile)=>profile._id)},targetType:'candidate-profile',product:'candidate-profile-boost',status:'active',startsAt:{$lte:now},endsAt:{$gt:now}}).select('target endsAt').lean():[];const boostMap=new Map(boosts.map((boost)=>[String(boost.target),boost.endsAt]));
  visible.sort((a,b)=>Number(boostMap.has(String(b._id)))-Number(boostMap.has(String(a._id)))||new Date(b.updatedAt)-new Date(a.updatedAt));
  const candidates=visible.slice(0,limit).map((profile)=>({id:profile.user._id,name:`${profile.user.firstName} ${profile.user.lastName}`,headline:profile.headline,location:profile.location,bio:profile.bio,skills:profile.skills||[],experience:profile.experience||[],education:profile.education||[],preferences:profile.preferences||{},resume:profile.privacy?.showResumeToRecruiters===false?null:profile.resume,promotion:{boosted:boostMap.has(String(profile._id)),endsAt:boostMap.get(String(profile._id))||null}}));
  return res.json({candidates});
}
export async function getNotifications(req,res){return res.json(await listUserNotifications(req.user._id,{limit:req.query.limit}));}
export async function readNotification(req,res){if(!mongoose.isValidObjectId(req.params.id))return res.status(400).json({message:'Invalid notification reference.'});const notification=await markNotificationRead(req.user._id,req.params.id);if(!notification)return res.status(404).json({message:'Notification not found.'});return res.json({message:'Notification marked as read.',notification});}
export async function readAllNotifications(req,res){const count=await markAllNotificationsRead(req.user._id);return res.json({message:count?'Notifications marked as read.':'No unread notifications.',count});}
