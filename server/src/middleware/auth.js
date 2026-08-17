import jwt from 'jsonwebtoken';
import User from '../models/User.js';
export async function requireAuth(req,res,next){try{const token=req.cookies.rbsc_token;if(!token)return res.status(401).json({message:'Authentication required'});const payload=jwt.verify(token,process.env.JWT_SECRET);const user=await User.findById(payload.sub).select('-password');if(!user||user.status!=='active')return res.status(401).json({message:'Account unavailable'});req.user=user;next();}catch{return res.status(401).json({message:'Invalid or expired session'});}}
export function allowRoles(...roles){return (req,res,next)=>roles.includes(req.user.role)?next():res.status(403).json({message:'Insufficient permissions'});}
