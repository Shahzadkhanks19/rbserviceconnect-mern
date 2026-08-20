import mongoose from 'mongoose';

let initialization;
let expressApp;

async function initialize(){
  const [appModule,dbModule,envModule,adminModule]=await Promise.all([
    import('../server/src/app.js'),
    import('../server/src/config/db.js'),
    import('../server/src/config/env.js'),
    import('../server/src/utils/ensureAdmin.js'),
  ]);

  expressApp=appModule.default;
  envModule.validateEnvironment();
  if(mongoose.connection.readyState===0)await dbModule.connectDatabase();
  await adminModule.ensureAdminAccount();
}

export default async function handler(req,res){
  try{
    if(!initialization)initialization=initialize().catch((error)=>{initialization=undefined;throw error;});
    await initialization;
    return expressApp(req,res);
  }catch(error){
    console.error('Vercel API initialization failed:',error);
    return res.status(500).json({message:'Service initialization failed.'});
  }
}
