import ContactMessage from '../models/ContactMessage.js';
import { clean,validEmail,validationError } from '../utils/validation.js';

const topics=new Set(['general','candidate','recruiter','verification','accessibility']);

export async function submitContactMessage(req,res){
  const name=clean(req.body?.name,100),email=clean(req.body?.email,254).toLowerCase(),topic=clean(req.body?.topic,40)||'general',message=clean(req.body?.message,3000);
  const errors={};
  if(name.length<2)errors.name='Name must be at least 2 characters.';
  if(!validEmail(email))errors.email='Enter a valid email address.';
  if(!topics.has(topic))errors.topic='Choose a valid support topic.';
  if(message.length<10)errors.message='Message must be at least 10 characters.';
  if(Object.keys(errors).length)return validationError(res,errors);
  const contactMessage=await ContactMessage.create({name,email,topic,message});
  return res.status(201).json({message:'Thanks. Your message has been received.',id:contactMessage._id});
}
