import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import { existsSync } from 'node:fs';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { handleRazorpayWebhook } from './controllers/razorpayWebhookController.js';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';
import candidateRoutes from './routes/candidateRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import publicRoutes from './routes/publicRoutes.js';
import recruiterRoutes from './routes/recruiterRoutes.js';

const app=express();
const clientUrl=process.env.CLIENT_URL;
const production=process.env.NODE_ENV==='production';
const moduleDir=dirname(fileURLToPath(import.meta.url));
const clientDist=resolve(moduleDir,'../../client/dist');
const limiter=(limit,message)=>rateLimit({windowMs:15*60*1000,limit,standardHeaders:'draft-8',legacyHeaders:false,message:{message},skipSuccessfulRequests:false});
const noStore=(_req,res,next)=>{res.set('Cache-Control','no-store, private');res.set('Pragma','no-cache');next();};

app.disable('x-powered-by');
if(production)app.set('trust proxy',1);
app.use(helmet({
  crossOriginResourcePolicy:{policy:'cross-origin'},
  referrerPolicy:{policy:'strict-origin-when-cross-origin'},
  hsts:production?{maxAge:31536000,includeSubDomains:true,preload:false}:false,
  contentSecurityPolicy:{
    directives:{
      defaultSrc:["'self'"],
      baseUri:["'self'"],
      fontSrc:["'self'",'https:','data:'],
      formAction:["'self'"],
      frameAncestors:["'self'"],
      imgSrc:["'self'",'data:','blob:','https://media.githubusercontent.com','https://res.cloudinary.com'],
      objectSrc:["'none'"],
      scriptSrc:["'self'",'https://checkout.razorpay.com'],
      connectSrc:["'self'",'https:','wss:','ws:'],
      frameSrc:["'self'",'https://api.razorpay.com','https://checkout.razorpay.com'],
      styleSrc:["'self'","'unsafe-inline'"],
      upgradeInsecureRequests:production?[]:null,
    },
  },
}));
app.use(cors({origin:clientUrl,credentials:true,methods:['GET','POST','PUT','PATCH','DELETE','OPTIONS'],allowedHeaders:['Content-Type','Accept','X-Razorpay-Signature','X-Razorpay-Event-Id']}));
// Razorpay signs the exact raw request bytes. This route must stay before express.json().
app.post('/api/webhooks/razorpay',express.raw({type:'application/json',limit:'1mb'}),handleRazorpayWebhook);
// Resume/message uploads are base64 encoded and independently type/size validated by their controllers.
app.use(express.json({limit:'7mb'}));
app.use(express.urlencoded({extended:false,limit:'1mb'}));
app.use(cookieParser());
app.use('/api',limiter(300,'Too many requests. Please try again shortly.'));
app.use('/api/auth/login',limiter(12,'Too many sign-in attempts. Please wait before trying again.'));
app.use('/api/auth/register',limiter(8,'Too many registration attempts. Please wait before trying again.'));
app.use('/api/auth/verify-email',limiter(12,'Too many email verification attempts. Please wait before trying again.'));
app.use('/api/auth/resend-verification',limiter(5,'Too many verification email requests. Please wait before requesting another link.'));
app.use('/api/auth/forgot-password',limiter(5,'Too many password reset requests. Please wait before trying again.'));
app.use('/api/auth/reset-password',limiter(8,'Too many password reset attempts. Please wait before trying again.'));
app.use('/api/contact',limiter(8,'Too many contact submissions. Please wait before trying again.'));
// Authentication and workspace responses can contain account, hiring, messaging, or billing data and must not be stored by intermediaries.
app.use(['/api/auth','/api/candidate','/api/recruiter','/api/admin'],noStore);
app.get('/api/health',(_req,res)=>res.set('Cache-Control','no-store').json({status:'ok',service:'rbserviceconnect-api'}));
app.use('/api/auth',authRoutes);
app.use('/api/contact',contactRoutes);
app.use('/api/public',publicRoutes);
app.use('/api/candidate',candidateRoutes);
app.use('/api/recruiter',recruiterRoutes);
app.use('/api/admin',adminRoutes);

// A production build can be deployed as one Node service. Vite's hashed assets are immutable; HTML is always revalidated.
if(production&&existsSync(clientDist)){
  app.use(express.static(clientDist,{
    index:false,
    setHeaders:(res,filePath)=>{
      if(filePath.includes(`${sep}assets${sep}`))res.set('Cache-Control','public, max-age=31536000, immutable');
      else res.set('Cache-Control','public, max-age=3600');
    },
  }));
  app.use((req,res,next)=>{
    if(req.method!=='GET'||req.path.startsWith('/api')||req.path.startsWith('/socket.io')||!req.accepts('html'))return next();
    res.set('Cache-Control','no-cache');
    return res.sendFile(join(clientDist,'index.html'));
  });
}

app.use((req,res)=>res.status(404).json({message:`Route not found: ${req.method} ${req.originalUrl}`}));
app.use((err,_req,res,_next)=>{console.error(production?err.message:err);res.status(err.status||500).json({message:production?'Something went wrong. Please try again.':err.message});});
export default app;
