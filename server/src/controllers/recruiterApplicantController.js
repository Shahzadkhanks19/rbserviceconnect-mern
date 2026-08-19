import mongoose from 'mongoose';
import Application from '../models/Application.js';
import CandidateProfile from '../models/CandidateProfile.js';
import Job from '../models/Job.js';

const statuses=new Set(['applied','reviewing','shortlisted','interview','offered','hired','rejected','withdrawn']);
function publicApplicantProfile(profile){if(!profile)return null;return {headline:profile.headline||'',phone:profile.phone||'',location:profile.location||'',bio:profile.bio||'',portfolioUrl:profile.portfolioUrl||'',linkedinUrl:profile.linkedinUrl||'',skills:profile.skills||[],experience:profile.experience||[],education:profile.education||[],preferences:profile.preferences||{}};}
export async function listRecruiterApplicants(req,res){
  const jobs=await Job.find({createdBy:req.user._id}).select('_id title slug').lean();
  const ids=jobs.map(job=>job._id);
  const filter={job:{$in:ids}};
  const status=String(req.query.status||'');
  if(status){if(!statuses.has(status))return res.status(400).json({message:'Invalid application status filter.'});filter.status=status;}
  const job=String(req.query.job||'');
  if(job){if(!mongoose.isValidObjectId(job)||!ids.some(id=>String(id)===job))return res.status(400).json({message:'Invalid recruiter job filter.'});filter.job=job;}
  const applications=await Application.find(filter).sort({createdAt:-1}).populate({path:'candidate',match:{role:'candidate'},select:'firstName lastName email status emailVerified'}).lean();
  const candidateIds=applications.map(item=>item.candidate?._id).filter(Boolean);
  const profiles=candidateIds.length?await CandidateProfile.find({user:{$in:candidateIds}}).lean():[];
  const profileMap=new Map(profiles.map(profile=>[String(profile.user),publicApplicantProfile(profile)]));
  return res.json({jobs,applications:applications.filter(item=>item.candidate).map(item=>({...item,candidateProfile:profileMap.get(String(item.candidate._id))||null}))});
}
