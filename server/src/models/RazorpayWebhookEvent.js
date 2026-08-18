import mongoose from 'mongoose';

const razorpayWebhookEventSchema=new mongoose.Schema({eventId:{type:String,required:true,unique:true,index:true,maxlength:180},eventType:{type:String,required:true,index:true,maxlength:120},payload:{type:mongoose.Schema.Types.Mixed,required:true},status:{type:String,enum:['pending','processing','processed','failed'],default:'pending',index:true},attempts:{type:Number,default:0,min:0},lastError:{type:String,maxlength:2000,default:''},processedAt:{type:Date,default:null}},{timestamps:true});
razorpayWebhookEventSchema.index({status:1,updatedAt:1});
export default mongoose.model('RazorpayWebhookEvent',razorpayWebhookEventSchema);
