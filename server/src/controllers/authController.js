import crypto from 'node:crypto';
import User from '../models/User.js';
import { brandedEmail, sendEmail } from '../services/emailService.js';
import { setAuthCookie, signAccessToken } from '../utils/tokens.js';

export async function register(req,res){const {firstName,lastName,email,password,role='candidate'}=req.body;if(!firstName||!lastName||!email||!password)return res.status(400).json({message:'All required fields must be provided'});if(!['candidate','recruiter'].includes(role))return res.status(400).json({message:'Invalid account role'});if(password.length<8)return res.status(400).json({message:'Password must be at least 8 characters'});const existing=await User.findOne({email:email.toLowerCase()});if(existing)return res.status(409).json({message:'An account with this email already exists'});const user=await User.create({firstName,lastName,email,password,role,status:role==='recruiter'?'pending':'active'});return res.status(201).json({message:role==='recruiter'?'Recruiter account created and awaiting approval':'Account created successfully',user:{id:user._id,firstName:user.firstName,lastName:user.lastName,email:user.email,role:user.role,status:user.status}});}

export async function login(req,res){const {email,password}=req.body;if(!email||!password)return res.status(400).json({message:'Email and password are required'});const user=await User.findOne({email:email.toLowerCase()}).select('+password');if(!user||!(await user.comparePassword(password)))return res.status(401).json({message:'Invalid email or password'});if(user.status!=='active')return res.status(403).json({message:'Your account is not currently active'});user.lastLoginAt=new Date();await user.save({validateBeforeSave:false});const token=signAccessToken(user);setAuthCookie(res,token);return res.json({user:{id:user._id,firstName:user.firstName,lastName:user.lastName,email:user.email,role:user.role}});}

export async function forgotPassword(req,res){
  const email=String(req.body?.email||'').trim().toLowerCase();
  const generic={message:'If an account exists for that email, a password reset link has been sent.'};
  if(!email)return res.status(400).json({message:'Email is required'});

  const user=await User.findOne({email});
  if(!user)return res.json(generic);

  const token=crypto.randomBytes(32).toString('hex');
  user.passwordResetTokenHash=crypto.createHash('sha256').update(token).digest('hex');
  user.passwordResetExpiresAt=new Date(Date.now()+30*60*1000);
  await user.save({validateBeforeSave:false});

  const resetUrl=`${process.env.CLIENT_URL}/reset-password?token=${encodeURIComponent(token)}`;
  const html=brandedEmail({
    eyebrow:'Account security',
    title:'Reset your password',
    greeting:`Hello ${user.firstName},`,
    paragraphs:[
      'We received a request to reset the password for your Royalties Service Connect account.',
      'Use the secure button below to choose a new password. The reset link expires in 30 minutes.',
    ],
    buttonLabel:'Reset password',
    buttonUrl:resetUrl,
    note:'If you did not request this password reset, you can safely ignore this email. Your current password will remain unchanged.',
  });
  const text=`Hello ${user.firstName},\n\nWe received a request to reset your Royalties Service Connect password.\n\nReset your password: ${resetUrl}\n\nThis link expires in 30 minutes. If you did not request this, you can ignore this email.`;

  try{
    const result=await sendEmail({to:user.email,subject:'Reset your RB Service Connect password',html,text});
    if(result.skipped&&process.env.NODE_ENV!=='production')console.info(`Password reset link for ${user.email}: ${resetUrl}`);
  }catch(error){
    user.passwordResetTokenHash=null;
    user.passwordResetExpiresAt=null;
    await user.save({validateBeforeSave:false});
    throw error;
  }

  return res.json(generic);
}

export async function resetPassword(req,res){
  const token=String(req.body?.token||'');
  const password=String(req.body?.password||'');
  if(!token||!password)return res.status(400).json({message:'Reset token and new password are required'});
  if(password.length<8)return res.status(400).json({message:'Password must be at least 8 characters'});

  const tokenHash=crypto.createHash('sha256').update(token).digest('hex');
  const user=await User.findOne({passwordResetTokenHash:tokenHash,passwordResetExpiresAt:{$gt:new Date()}}).select('+passwordResetTokenHash +passwordResetExpiresAt');
  if(!user)return res.status(400).json({message:'This password reset link is invalid or has expired'});

  user.password=password;
  user.passwordResetTokenHash=null;
  user.passwordResetExpiresAt=null;
  await user.save();
  return res.json({message:'Password reset successfully'});
}

export function logout(_req,res){res.clearCookie('rbsc_token',{path:'/'});return res.status(204).send();}
export function me(req,res){return res.json({user:req.user});}
