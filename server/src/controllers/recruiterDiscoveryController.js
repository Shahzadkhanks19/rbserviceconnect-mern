import CandidateProfile from '../models/CandidateProfile.js';
import { listUserNotifications, markAllNotificationsRead, markNotificationRead } from '../services/notificationService.js';

function escapeRegExp(value=''){return String(value).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
export async function searchCandidates(req,res){
  const q=String(req.query.q||'').trim();const location=String(req.query.location||'').trim();const skill=String(req.query.skill||'').trim();const workplace=String(req.query.workplace||'').trim();const jobType=String(req.query.jobType||'').trim();const openOnly=req.query.openOnly!=='false';const limit=Math.min(Math.max(Number(req.query.limit)||30,1),100);
  const filter={'privacy.discoverableToRecruiters':{$ne:false}};
  if(openOnly)filter['preferences.openToWork']=true;
  if(location)filter.location={$regex:escapeRegExp(location),$options:'i'};
  if(skill)filter.skills={$elemMatch:{$regex:escapeRegExp(skill),$options:'i'}};
  if(workplace)filter['preferences.workplaces']=workplace;
  if(jobType)filter['preferences.jobTypes']=jobType;
  if(q){const rx={$regex:escapeRegExp(q),$options:'i'};filter.$or=[{headline:rx},{bio:rx},{skills:{$elemMatch:rx}},{'experience.title':rx},{'experience.company':rx},{'education.degree':rx},{'education.field':rx}];}
  const profiles=await CandidateProfile.find(filter).sort({updatedAt:-1}).limit(limit).populate('user','firstName lastName email').lean();
  const candidates=profiles.filter((profile)=>profile.user).map((profile)=>({
    id:profile.user._id,name:`${profile.user.firstName} ${profile.user.lastName}`,email:profile.user.email,headline:profile.headline,location:profile.location,bio:profile.bio,skills:profile.skills||[],experience:profile.experience||[],education:profile.education||[],preferences:profile.preferences||{},resume:profile.privacy?.showResumeToRecruiters===false?null:profile.resume,
  }));
  return res.json({candidates});
}

export async function getNotifications(req,res){return res.json(await listUserNotifications(req.user._id,{limit:req.query.limit}));}
export async function readNotification(req,res){const notification=await markNotificationRead(req.user._id,req.params.id);if(!notification)return res.status(404).json({message:'Notification not found.'});return res.json({message:'Notification marked as read.',notification});}
export async function readAllNotifications(req,res){const count=await markAllNotificationsRead(req.user._id);return res.json({message:'Notifications marked as read.',count});}
