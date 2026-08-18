import jwt from 'jsonwebtoken';
import { Server } from 'socket.io';
import Conversation from '../models/Conversation.js';
import User from '../models/User.js';

function readCookie(header='',name){const prefix=`${name}=`;return header.split(';').map((part)=>part.trim()).find((part)=>part.startsWith(prefix))?.slice(prefix.length)||'';}
function validId(value){return typeof value==='string'&&/^[a-f\d]{24}$/i.test(value);}
function conversationFilter(socket,conversationId){return socket.user.role==='recruiter'?{_id:conversationId,recruiter:socket.user._id}:{_id:conversationId,candidate:socket.user._id};}

export function createSocketServer(httpServer,app){
  const io=new Server(httpServer,{cors:{origin:process.env.CLIENT_URL,credentials:true,methods:['GET','POST']},maxHttpBufferSize:1e6,pingTimeout:20000,pingInterval:25000});
  io.use(async(socket,next)=>{try{const token=readCookie(socket.handshake.headers.cookie,'rbsc_token');if(!token)return next(new Error('Authentication required'));const payload=jwt.verify(token,process.env.JWT_SECRET,{algorithms:['HS256']});const user=await User.findById(payload.sub).select('firstName lastName role status');if(!user||user.status!=='active'||!['candidate','recruiter'].includes(user.role))return next(new Error('Account unavailable'));socket.user=user;return next();}catch{return next(new Error('Invalid or expired session'));}});
  io.on('connection',(socket)=>{
    socket.join(`user:${socket.user._id}`);
    socket.on('conversation:join',async(conversationId)=>{if(!validId(conversationId))return;if(await Conversation.exists(conversationFilter(socket,conversationId)))socket.join(`conversation:${conversationId}`);});
    socket.on('conversation:leave',(conversationId)=>{if(validId(conversationId))socket.leave(`conversation:${conversationId}`);});
    socket.on('typing:start',async(conversationId)=>{if(!validId(conversationId))return;if(await Conversation.exists(conversationFilter(socket,conversationId)))socket.to(`conversation:${conversationId}`).emit('typing',{conversationId,userId:String(socket.user._id),name:socket.user.firstName,typing:true});});
    socket.on('typing:stop',async(conversationId)=>{if(!validId(conversationId))return;if(await Conversation.exists(conversationFilter(socket,conversationId)))socket.to(`conversation:${conversationId}`).emit('typing',{conversationId,userId:String(socket.user._id),name:socket.user.firstName,typing:false});});
  });
  app.set('io',io);
  return io;
}
