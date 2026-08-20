import mongoose from 'mongoose';

export async function connectDatabase(){
  const uri=process.env.MONGODB_URI;
  if(!uri)throw new Error('MONGODB_URI is required');
  await mongoose.connect(uri,{
    serverSelectionTimeoutMS:10000,
    connectTimeoutMS:10000,
    maxPoolSize:Number(process.env.MONGODB_MAX_POOL_SIZE||20),
    minPoolSize:process.env.NODE_ENV==='production'?2:0,
  });
  console.log('MongoDB connected');
}
