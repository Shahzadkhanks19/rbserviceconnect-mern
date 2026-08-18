import mongoose from 'mongoose';
import { promotionProducts,publicPromotionCatalogue } from '../config/monetization.js';
import CandidateProfile from '../models/CandidateProfile.js';
import Job from '../models/Job.js';
import Promotion from '../models/Promotion.js';

export async function getPromotionCatalogue(req,res){return res.json({products:publicPromotionCatalogue(req.user.role)});}
export async function listPromotions(req,res){const promotions=await Promotion.find({owner:req.user._id}).sort({createdAt:-1}).lean();return res.json({promotions});}

export async function createPromotion(req,res){
  const productId=String(req.body.product||'');const product=promotionProducts[productId];const durationDays=Number(req.body.durationDays);const targetId=String(req.body.targetId||'');
  if(!product||product.audience!==req.user.role)return res.status(400).json({message:'This promotion is not available for your account.'});
  const option=product.options.find((item)=>item.days===durationDays);if(!option)return res.status(400).json({message:'Select a valid promotion duration.'});
  let target;
  if(product.targetType==='candidate-profile'){
    target=await CandidateProfile.findOne({user:req.user._id});if(!target)return res.status(404).json({message:'Complete your candidate profile before boosting it.'});
  }else{
    if(!mongoose.isValidObjectId(targetId))return res.status(400).json({message:'Select a valid job to promote.'});
    target=await Job.findOne({_id:targetId,createdBy:req.user._id});if(!target)return res.status(404).json({message:'Job not found.'});
    if(!['published','reviewing'].includes(target.status))return res.status(400).json({message:'Only active jobs can be promoted.'});
  }
  const existing=await Promotion.findOne({owner:req.user._id,product:productId,target:target._id,status:{$in:['pending','active']}});if(existing)return res.status(409).json({message:'This promotion already has a pending or active purchase.'});
  const promotion=await Promotion.create({owner:req.user._id,audience:req.user.role,product:productId,targetType:product.targetType,target:target._id,durationDays,amount:option.amount,currency:'INR'});
  return res.status(201).json({message:'Promotion order created. Payment activation will be available when the payment gateway is connected.',promotion});
}
