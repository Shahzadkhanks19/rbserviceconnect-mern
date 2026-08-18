import CandidateProfile from '../models/CandidateProfile.js';
import JobAlert from '../models/JobAlert.js';
import Notification from '../models/Notification.js';

export async function createNotification({user,type,title,message,link='',metadata={}}){
  if(!user)return null;
  return Notification.create({user,type,title,message,link,metadata});
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
  return Notification.findOneAndUpdate({_id:id,user:userId},{$set:{readAt:new Date()}},{new:true});
}

export async function markAllNotificationsRead(userId){
  const result=await Notification.updateMany({user:userId,readAt:null},{$set:{readAt:new Date()}});
  return result.modifiedCount||0;
}

function matchesAlert(job,alert){
  const keyword=String(alert.keywords||'').trim().toLowerCase();
  const location=String(alert.location||'').trim().toLowerCase();
  const haystack=[job.title,job.summary,job.description,job.category,...(job.skills||[])].join(' ').toLowerCase();
  const locationText=[job.location?.city,job.location?.state,job.location?.country].filter(Boolean).join(' ').toLowerCase();
  return (!keyword||haystack.includes(keyword))&&(!location||locationText.includes(location))&&(!alert.category||job.category===alert.category)&&(!alert.workMode||job.workMode===alert.workMode)&&(!alert.employmentType||job.employmentType===alert.employmentType);
}

export async function notifyMatchingJobAlerts(job){
  const alerts=await JobAlert.find({active:true,inAppEnabled:true}).lean();
  const matched=alerts.filter((alert)=>matchesAlert(job,alert));
  if(!matched.length)return 0;
  const candidateIds=[...new Set(matched.map((alert)=>String(alert.candidate)))];
  const visibleProfiles=await CandidateProfile.find({user:{$in:candidateIds},'privacy.jobAlertsEnabled':{$ne:false}}).select('user').lean();
  const allowed=new Set(visibleProfiles.map((profile)=>String(profile.user)));
  const docs=matched.filter((alert)=>allowed.has(String(alert.candidate))).map((alert)=>({
    user:alert.candidate,
    type:'job_alert',
    title:`New role matching “${alert.name}”`,
    message:`${job.title} matches your saved job alert.`,
    link:`/jobs/${job.slug}`,
    metadata:{jobId:job._id,jobSlug:job.slug,alertId:alert._id},
  }));
  if(docs.length)await Notification.insertMany(docs,{ordered:false});
  await JobAlert.updateMany({_id:{$in:matched.map((alert)=>alert._id)}},{$set:{lastMatchedAt:new Date()}});
  return docs.length;
}
