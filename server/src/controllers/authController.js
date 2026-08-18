import crypto from 'node:crypto';
import PlatformSettings from '../models/PlatformSettings.js';
import User from '../models/User.js';
import { brandedEmail, sendEmail } from '../services/emailService.js';
import { clearAuthCookie, setAuthCookie, signAccessToken } from '../utils/tokens.js';

const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean=(value,max)=>String(value||'').trim().slice(0,max);
const validPassword=(password)=>typeof password==='string'&&password.length>=8&&password.length<=128;

export async function register(req,res){
  const firstName=clean(req.body?.firstName,60);const lastName=clean(req.body?.lastName,60);const email=clean(req.body?.email,254).toLowerCase();const password=String(req.body?.password||'');const role=req.body?.role||'candidate';
  if(!firstName||!lastName||!email||!password)return res.status(400).json({message:'All required fields must be provided'});
  if(!emailPattern.test(email))return res.status(400).json({message:'Enter a valid email address'});
  if(!['candidate','recruiter'].includes(role))return res.status(400).json({message:'Invalid account role'});
  if(!validPassword(password))return res.status(400).json({message:'Password must be between 8 and 128 characters'});
  const platform=await PlatformSettings.findOne({key:'default'}).lean();
  if(role==='candidate'&&platform?.candidateRegistrationOpen===false)return res.status(403).json({message:'Candidate registration is temporarily closed.'});
  if(role==='recruiter'&&platform?.recruiterRegistrationOpen===false)return res.status(403).json({message:'Recruiter registration is temporarily closed.'});
  const existing=await User.exists({email});
  if(existing)return res.status(409).json({message:'An account with this email already exists'});
  const approvalRequired=platform?.requireRecruiterApproval!==false;const status=role==='recruiter'&&approvalRequired?'pending':'active';
  try{const user=await User.create({firstName,lastName,email,password,role,status});return res.status(201).json({message:role==='recruiter'&&approvalRequired?'Recruiter account created and awaiting approval':'Account created successfully',user:{id:user._id,firstName:user.firstName,lastName:user.lastName,email:user.email,role:user.role,status:user.status}});}catch(error){if(error?.code===11000)return res.status(409).json({message:'An account with this email already exists'});throw error;}
}

export async function login(req,res){
  const email=clean(req.body?.email,254).toLowerCase();const password=String(req.body?.password||'');
  if(!email||!password)return res.status(400).json({message:'Email and password are required'});
  if(!emailPattern.test(email)||password.length>128)return res.status(401).json({message:'Invalid email or password'});
  const user=await User.findOne({email}).select('+password');
  if(!user||!(await user.comparePassword(password)))return res.status(401).json({message:'Invalid email or password'});
  if(user.status!=='active')return res.status(403).json({message:'Your account is not currently active'});
  const token=signAccessToken(user);setAuthCookie(res,token);await User.updateOne({_id:user._id},{$set:{lastLoginAt:new Date()}});
  return res.json({user:{id:user._id,firstName:user.firstName,lastName:user.lastName,email:user.email,role:user.role}});
}

export async function forgotPassword(req,res){
  const email=clean(req.body?.email,254).toLowerCase();const generic={message:'If an account exists for that email, a password reset link has been sent.'};if(!email||!emailPattern.test(email))return res.json(generic);const user=await User.findOne({email});if(!user)return res.json(generic);const token=crypto.randomBytes(32).toString('hex');user.passwordResetTokenHash=crypto.createHash('sha256').update(token).digest('hex');user.passwordResetExpiresAt=new Date(Date.now()+30*60*1000);await user.save({validateBeforeSave:false});const resetUrl=`${process.env.CLIENT_URL}/reset-password?token=${encodeURIComponent(token)}`;const html=brandedEmail({eyebrow:'Account security',title:'Reset your password',greeting:`Hello ${user.firstName},`,paragraphs:['We received a request to reset the password for your Royalties Service Connect account.','Use the secure button below to choose a new password. The reset link expires in 30 minutes.'],buttonLabel:'Reset password',buttonUrl:resetUrl,note:'If you did not request this password reset, you can safely ignore this email. Your current password will remain unchanged.'});const text=`Hello ${user.firstName},\n\nWe received a request to reset your Royalties Service Connect password.\n\nReset your password: ${resetUrl}\n\nThis link expires in 30 minutes. If you did not request this, you can ignore this email.`;try{const result=await sendEmail({to:user.email,subject:'Reset your RB Service Connect password',html,text});if(result.skipped&&process.env.NODE_ENV!=='production')console.info(`Password reset link for ${user.email}: ${resetUrl}`);}catch(error){user.passwordResetTokenHash=null;user.passwordResetExpiresAt=null;await user.save({validateBeforeSave:false});throw error;}return res.json(generic);
}

export async function resetPassword(req,res){const token=String(req.body?.token||'');const password=String(req.body?.password||'');if(!token||!password)return res.status(400).json({message:'Reset token and new password are required'});if(!validPassword(password))return res.status(400).json({message:'Password must be between 8 and 128 characters'});const tokenHash=crypto.createHash('sha256').update(token).digest('hex');const user=await User.findOne({passwordResetTokenHash:tokenHash,passwordResetExpiresAt:{$gt:new Date()}}).select('+passwordResetTokenHash +passwordResetExpiresAt');if(!user)return res.status(400).json({message:'This password reset link is invalid or has expired'});user.password=password;user.passwordResetTokenHash=null;user.passwordResetExpiresAt=null;await user.save();clearAuthCookie(res);return res.json({message:'Password reset successfully'});}
export function logout(_req,res){clearAuthCookie(res);return res.status(204).send();}
export function me(req,res){return res.json({user:req.user});}
