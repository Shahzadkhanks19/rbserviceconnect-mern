import 'dotenv/config';
import { createServer } from 'node:http';
import mongoose from 'mongoose';
import app from '../server/src/app.js';
import { connectDatabase } from '../server/src/config/db.js';
import { validateEnvironment } from '../server/src/config/env.js';
import { createSocketServer } from '../server/src/realtime/socket.js';
import { ensureAdminAccount } from '../server/src/utils/ensureAdmin.js';

validateEnvironment();
if(mongoose.connection.readyState===0)await connectDatabase();
await ensureAdminAccount();

const server=createServer(app);
createSocketServer(server,app);
export default server;
