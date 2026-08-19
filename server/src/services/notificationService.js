import CandidateProfile from '../models/CandidateProfile.js';
import JobAlert from '../models/JobAlert.js';
import Notification from '../models/Notification.js';
import User from '../models/User.js';
import { brandedEmail, sendEmail } from './emailService.js';

let realtimeNotify=null;
export function setNotificationRealtime(handler){realtimeNotify=typeof handler==='function'?handler:null;}
function emitNotificationUpdate(userId,payload={}){if(!realtimeNotify||!userId)return;try{realtimeNotify(String(userId),payload);}catch(error){console.error('Notification realtime emit failed:',error.message);}}
const clean=(value,max)=>String(value||'').trim().slice(0,max);

export async function createNotification({user,type,title,message,link='',metadata={}}){
  if(!user)return null;
  const notification=await Notification.create({user,type:clean(type,80),title:clean(title,180),message:clean(message,1200),link:clean(link,500),metadata:metadata&&typeof metadata==='object'?metadata:{}});
  emitNotificationUpdate(user,{action:'created',notificationId:String(notification._id)});
  return notification;
}

export async function listUserNotifications(userId,{limit=50}={}){
  const safeLimit=Math.min(Math.max(Number(limit)||50,1),100);
  const [notifications,unreadCount]=await Promise.all([
    Notification.find({user:userId}).sort({createdAt:-1}).limit(safeLimit).lean(),
    Notification.countDocuments({user:userId,readAt:null}),
  ]);
  return {notifications,unreadCount};
}

export async function markNotificationRead(userId,id){
  const notification=await Notification.findOneAndUpdate({_id:id,user:userId,readAt:null},{$set:{readAt:new Date()}},{new:true});
  if(notification)emitNotificationUpdate(userId,{action:'read',notificationId:String(notification._id)});
  return notification||Notification.findOne({_id:id,user:userId});
}

export async function markAllNotificationsRead(userId){
  const result=await Notification.updateMany({user:userId,readAt:null},{$set:{readAt:new Date()}});
  const count=result.modifiedCount||0;if(count)emitNotificationUpdate(userId,{action:'read-all',count});
  return count;
}

function matchesAlert(job,alert){
  const keyword=String(alert.keywords||'').trim().toLowerCase();
  const location=String(alert.location||'').trim().toLowerCase();
  const haystack=[job.title,job.summary,job.description,job.category,...(job.skills||[])].join(' ').toLowerCase();
  const locationText=[job.location?.city,job.location?.state,job.location?.country].filter(Boolean).join(' ').toLowerCase();
  return (!keyword||haystack.includes(keyword))&&(!location||locationText.includes(location))&&(!alert.category||job.category===alert.category)&&(!alert.workMode||job.workMode===alert.workMode)&&(!alert.employmentType||job.employmentType===alert.employmentType);
}

export async function notifyMatchingJobAlerts(job){
  const alerts=await JobAlert.find({active:true}).lean();
  const matched=alerts.filter((alert)=>matchesAlert(job,alert));
  if(!matched.length)return 0;
  const candidateIds=[...new Set(matched.map((alert)=>String(alert.candidate)))];
  const [profiles,users]=await Promise.all([
    CandidateProfile.find({user:{$in:candidateIds},'privacy.jobAlertsEnabled':{$ne:false}}).select('user').lean(),
    User.find({_id:{$in:candidateIds},status:'active'}).select('firstName email').lean(),
  ]);
  const allowed=new Set(profiles.map((profile)=>String(profile.user)));const userMap=new Map(users.map((user)=>[String(user._id),user]));
  const eligible=matched.filter((alert)=>allowed.has(String(alert.candidate))&&userMap.has(String(alert.candidate)));
  const docs=eligible.filter((alert)=>alert.inAppEnabled!==false).map((alert)=>({user:alert.candidate,type:'job_alert',title:`New role matching “${alert.name}”`,message:`${job.title} matches your saved job alert.`,link:`/jobs/${job.slug}`,metadata:{jobId:job._id,jobSlug:job.slug,alertId:alert._id}}));
  if(docs.length){await Notification.insertMany(docs,{ordered:false});for(const userId of new Set(docs.map((doc)=>String(doc.user))))emitNotificationUpdate(userId,{action:'bulk-created',type:'job_alert'});}
  const jobUrl=`${process.env.CLIENT_URL}/jobs/${job.slug}`;
  await Promise.allSettled(eligible.filter((alert)=>alert.emailEnabled!==false).map((alert)=>{const user=userMap.get(String(alert.candidate));return sendEmail({to:user.email,subject:`New job match: ${job.title}`,html:brandedEmail({eyebrow:'Job alert',title:'A new role matches your alert',greeting:`Hello ${user.firstName},`,paragraphs:[`${job.title} matches your saved job alert “${alert.name}”.`,'Open the role to review the full job description and decide whether it fits your next move.'],buttonLabel:'View matching job',buttonUrl:jobUrl,note:'You can manage or pause job alerts from your candidate workspace.'}),text:`${job.title} matches your job alert “${alert.name}”. View: ${jobUrl}`});}));
  await JobAlert.updateMany({_id:{$in:eligible.map((alert)=>alert._id)}},{$set:{lastMatchedAt:new Date()}});
  return eligible.length;
}
