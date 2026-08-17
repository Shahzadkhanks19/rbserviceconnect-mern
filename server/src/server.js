import 'dotenv/config';
import app from './app.js';
import { connectDatabase } from './config/db.js';
const port=Number(process.env.PORT||5000);
try{await connectDatabase();app.listen(port,()=>console.log(`RB Service Connect API running on port ${port}`));}catch(error){console.error('Failed to start server:',error);process.exit(1);}
