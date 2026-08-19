import jwt from 'jsonwebtoken';
import { Server } from 'socket.io';
import Conversation from '../models/Conversation.js';
import User from '../models/User.js';
import UserBlock from '../models/UserBlock.js';
import { setNotificationRealtime } from '../services/notificationService.js';

function readCookie(header='',name){const prefix=`${name}=`;return header.split(';').map((part)=>part.trim()).find((part)=>part.startsWith(prefix))?.slice(prefix.length)||'';}
function validId(value){return typeof value==='string'&&/^[a-f\d]{24}$/i.test(value);}
function conversationFilter(socket,conversationId){return socket.user.role==='recruiter'?{_id:conversationId,recruiter:socket.user._id}:{_id:conversationId,candidate:socket.user._id};}
function counterpart(socket,conversation){return String(socket.user._id)===String(conversation.recruiter)?conversation.candidate:conversation.recruiter;}
async function accessibleConversation(socket,conversationId,{requireMessaging=false}={}){if(!validId(conversationId))return null;const conversation=await Conversation.findOne(conversationFilter(socket,conversationId)).select('candidate recruiter').lean();if(!conversation)return null;if(requireMessaging){const other=counterpart(socket,conversation);if(await UserBlock.exists({$or:[{blocker:socket.user._id,blocked:other},{blocker:other,blocked:socket.user._id}]}))return null;}return conversation;}

export function createSocketServer(httpServer,app){
  const io=new Server(httpServer,{cors:{origin:process.env.CLIENT_URL,credentials:true,methods:['GET','POST']},maxHttpBufferSize:1e6,pingTimeout:20000,pingInterval:25000});
  setNotificationRealtime((userId,payload)=>io.to(`user:${userId}`).emit('notification:updated',payload));
  io.use(async(socket,next)=>{try{const token=readCookie(socket.handshake.headers.cookie,'rbsc_token');if(!token)return next(new Error('Authentication required'));const payload=jwt.verify(token,process.env.JWT_SECRET,{algorithms:['HS256']});if(!payload.sub)return next(new Error('Invalid session'));const user=await User.findById(payload.sub).select('firstName lastName role status');if(!user||user.status!=='active'||!['candidate','recruiter'].includes(user.role))return next(new Error('Account unavailable'));socket.user=user;return next();}catch{return next(new Error('Invalid or expired session'));}});
  io.on('connection',(socket)=>{
    socket.join(`user:${socket.user._id}`);
    socket.on('conversation:join',async(conversationId,ack)=>{try{const conversation=await accessibleConversation(socket,conversationId);if(!conversation){if(typeof ack==='function')ack({ok:false,error:'Conversation unavailable.'});return;}await socket.join(`conversation:${conversationId}`);if(typeof ack==='function')ack({ok:true});}catch{if(typeof ack==='function')ack({ok:false,error:'Unable to join conversation.'});}});
    socket.on('conversation:leave',(conversationId,ack)=>{if(!validId(conversationId)){if(typeof ack==='function')ack({ok:false});return;}socket.leave(`conversation:${conversationId}`);if(typeof ack==='function')ack({ok:true});});
    socket.on('typing:start',async(conversationId)=>{try{if(!socket.rooms.has(`conversation:${conversationId}`))return;if(!await accessibleConversation(socket,conversationId,{requireMessaging:true}))return;socket.to(`conversation:${conversationId}`).emit('typing',{conversationId,userId:String(socket.user._id),name:socket.user.firstName,typing:true});}catch{return;}});
    socket.on('typing:stop',async(conversationId)=>{try{if(!socket.rooms.has(`conversation:${conversationId}`))return;if(!await accessibleConversation(socket,conversationId,{requireMessaging:true}))return;socket.to(`conversation:${conversationId}`).emit('typing',{conversationId,userId:String(socket.user._id),name:socket.user.firstName,typing:false});}catch{return;}});
  });
  app.set('io',io);
  return io;
}
