import 'dotenv/config';
import { createServer } from 'node:http';
import mongoose from 'mongoose';
import app from './app.js';
import { connectDatabase } from './config/db.js';
import { validateEnvironment } from './config/env.js';
import { createSocketServer } from './realtime/socket.js';
import { startBillingReminderWorker } from './services/billingReminderService.js';
import { startDemoAutopayWorker } from './services/demoAutopayService.js';
import { startRazorpayWebhookWorker } from './services/razorpayWebhookService.js';
import { ensureAdminAccount } from './utils/ensureAdmin.js';

const port=Number(process.env.PORT||5000);
let httpServer;
let shuttingDown=false;

async function shutdown(signal){
  if(shuttingDown)return;
  shuttingDown=true;
  console.log(`${signal} received. Shutting down RB Service Connect cleanly.`);
  const forceTimer=setTimeout(()=>process.exit(1),10000);
  forceTimer.unref();
  try{
    if(httpServer)await new Promise((resolve)=>httpServer.close(resolve));
    await mongoose.connection.close(false);
    clearTimeout(forceTimer);
    process.exit(0);
  }catch(error){
    console.error('Graceful shutdown failed:',error);
    process.exit(1);
  }
}

process.on('SIGTERM',()=>void shutdown('SIGTERM'));
process.on('SIGINT',()=>void shutdown('SIGINT'));

try{
  validateEnvironment();
  await connectDatabase();
  await ensureAdminAccount();
  httpServer=createServer(app);
  createSocketServer(httpServer,app);
  httpServer.listen(port,()=>{
    console.log(`RB Service Connect API running on port ${port}`);
    startBillingReminderWorker();
    startDemoAutopayWorker();
    startRazorpayWebhookWorker();
  });
}catch(error){
  console.error('Failed to start server:',error);
  process.exit(1);
}
