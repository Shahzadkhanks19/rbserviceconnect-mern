import 'dotenv/config';
import { createServer } from 'node:http';
import app from './app.js';
import { connectDatabase } from './config/db.js';
import { validateEnvironment } from './config/env.js';
import { createSocketServer } from './realtime/socket.js';
import { startBillingReminderWorker } from './services/billingReminderService.js';
import { startDemoAutopayWorker } from './services/demoAutopayService.js';
import { startRazorpayWebhookWorker } from './services/razorpayWebhookService.js';
import { ensureAdminAccount } from './utils/ensureAdmin.js';

const port=Number(process.env.PORT||5000);

try{
  validateEnvironment();
  await connectDatabase();
  await ensureAdminAccount();
  const httpServer=createServer(app);
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
