const required=['MONGODB_URI','JWT_SECRET','CLIENT_URL'];

export function validateEnvironment(){
  const missing=required.filter((key)=>!String(process.env[key]||'').trim());
  if(missing.length)throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  if(String(process.env.JWT_SECRET).length<32)throw new Error('JWT_SECRET must be at least 32 characters long');
  let clientUrl;
  try{clientUrl=new URL(process.env.CLIENT_URL);}catch{throw new Error('CLIENT_URL must be a valid absolute URL');}
  if(!['http:','https:'].includes(clientUrl.protocol))throw new Error('CLIENT_URL must use http or https');
  if(process.env.NODE_ENV==='production'&&clientUrl.protocol!=='https:')throw new Error('CLIENT_URL must use HTTPS in production');
  if(process.env.NODE_ENV==='production'&&(!process.env.RESEND_API_KEY||!process.env.EMAIL_FROM))console.warn('Production email delivery is not fully configured.');
}
