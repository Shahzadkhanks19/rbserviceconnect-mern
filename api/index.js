import mongoose from 'mongoose';
import app from '../server/src/app.js';
import { connectDatabase } from '../server/src/config/db.js';
import { validateEnvironment } from '../server/src/config/env.js';
import { ensureAdminAccount } from '../server/src/utils/ensureAdmin.js';

let initialization;

async function initialize(){
  validateEnvironment();
  if(mongoose.connection.readyState===0)await connectDatabase();
  await ensureAdminAccount();
}

export default async function handler(req,res){
  try{
    if(!initialization)initialization=initialize().catch((error)=>{initialization=undefined;throw error;});
    await initialization;
    return app(req,res);
  }catch(error){
    console.error('Vercel API initialization failed:',error);
    return res.status(500).json({message:'Service initialization failed.'});
  }
}
