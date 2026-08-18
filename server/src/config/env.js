const required=['MONGODB_URI','JWT_SECRET','CLIENT_URL'];

export function validateEnvironment(){
  const missing=required.filter((key)=>!String(process.env[key]||'').trim());
  if(missing.length)throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  if(String(process.env.JWT_SECRET).length<32)throw new Error('JWT_SECRET must be at least 32 characters long');

  let clientUrl;
  try{clientUrl=new URL(process.env.CLIENT_URL);}catch{throw new Error('CLIENT_URL must be a valid absolute URL');}
  if(!['http:','https:'].includes(clientUrl.protocol))throw new Error('CLIENT_URL must use http or https');

  if(process.env.NODE_ENV==='production'){
    if(clientUrl.protocol!=='https:')throw new Error('CLIENT_URL must use HTTPS in production');
    if(['localhost','127.0.0.1','::1'].includes(clientUrl.hostname))throw new Error('CLIENT_URL cannot point to localhost in production');
    if(String(process.env.JWT_SECRET).length<48)throw new Error('JWT_SECRET must be at least 48 characters long in production');
    if(!process.env.RESEND_API_KEY||!process.env.EMAIL_FROM)console.warn('Production email delivery is not fully configured.');
    const cloudinaryConfigured=['CLOUDINARY_CLOUD_NAME','CLOUDINARY_API_KEY','CLOUDINARY_API_SECRET'].every((key)=>String(process.env[key]||'').trim());
    if(!cloudinaryConfigured)console.warn('Production Cloudinary uploads are not fully configured; resume and message attachment uploads will be unavailable.');
  }
}
