import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
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
const limiter=(limit,message)=>rateLimit({windowMs:15*60*1000,limit,standardHeaders:'draft-8',legacyHeaders:false,message:{message},skipSuccessfulRequests:false});

app.disable('x-powered-by');
if(production)app.set('trust proxy',1);
app.use(helmet({crossOriginResourcePolicy:{policy:'cross-origin'},referrerPolicy:{policy:'strict-origin-when-cross-origin'},hsts:production?{maxAge:31536000,includeSubDomains:true,preload:false}:false}));
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
app.use('/api/auth/forgot-password',limiter(5,'Too many password reset requests. Please wait before trying again.'));
app.use('/api/auth/reset-password',limiter(8,'Too many password reset attempts. Please wait before trying again.'));
app.use('/api/contact',limiter(8,'Too many contact submissions. Please wait before trying again.'));
app.get('/api/health',(_req,res)=>res.set('Cache-Control','no-store').json({status:'ok',service:'rbserviceconnect-api'}));
app.use('/api/auth',authRoutes);app.use('/api/contact',contactRoutes);app.use('/api/public',publicRoutes);app.use('/api/candidate',candidateRoutes);app.use('/api/recruiter',recruiterRoutes);app.use('/api/admin',adminRoutes);
app.use((req,res)=>res.status(404).json({message:`Route not found: ${req.method} ${req.originalUrl}`}));
app.use((err,_req,res,_next)=>{console.error(production?err.message:err);res.status(err.status||500).json({message:production?'Something went wrong. Please try again.':err.message});});
export default app;
