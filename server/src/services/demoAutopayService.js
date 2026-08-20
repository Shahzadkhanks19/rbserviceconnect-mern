import crypto from 'node:crypto';
import PaymentTransaction from '../models/PaymentTransaction.js';
import SuccessFee from '../models/SuccessFee.js';
import { finalizeCapturedBillingPayment,refreshBillingSchedule } from './billingPaymentService.js';
import { brandedEmail,sendEmail } from './emailService.js';
import { createNotification } from './notificationService.js';

const demoId=(prefix)=>`${prefix}_${crypto.randomBytes(10).toString('hex')}`;
const firstOpen=(fee)=>fee.billing.installments.filter((item)=>!['paid','waived'].includes(item.status)).sort((a,b)=>a.number-b.number)[0];
const shouldFail=()=>String(process.env.DEMO_AUTOPAY_FORCE_FAILURE||'false').toLowerCase()==='true';
const demoWorkerEnabled=()=>process.env.NODE_ENV!=='production'||String(process.env.ENABLE_DEMO_AUTOPAY||'false').toLowerCase()==='true';

async function notifyFailure(fee,installment,reason){
  const candidate=await SuccessFee.findById(fee._id).populate('candidate','firstName email').populate('job','title').lean();
  const message=`Demo AutoPay could not collect instalment ${installment.number} of ₹${installment.amount.toLocaleString('en-IN')}. Manual payment remains available.`;
  await createNotification({user:fee.candidate,type:'payment',title:'Demo AutoPay attempt failed',message,link:'/candidate/billing',metadata:{successFeeId:fee._id,installmentNumber:installment.number,mode:'demo'}});
  if(candidate?.candidate?.email)await sendEmail({to:candidate.candidate.email,subject:'Demo AutoPay attempt needs attention',html:brandedEmail({eyebrow:'Portfolio AutoPay simulation',title:'Automatic payment attempt failed',greeting:`Hello ${candidate.candidate.firstName},`,paragraphs:[message,reason],buttonLabel:'Review billing',buttonUrl:`${process.env.CLIENT_URL}/candidate/billing`,note:'This is a portfolio/demo mandate simulation. No bank account, card or UPI mandate was charged.'}),text:`${message} ${reason}`});
}

export async function executeDemoAutopay(feeId,now=new Date()){
  const fee=await SuccessFee.findById(feeId);
  if(!fee?.billing?.activatedAt||fee.billing.autopay?.mode!=='demo'||fee.billing.autopay?.status!=='active')return null;
  refreshBillingSchedule(fee,now);
  const installment=firstOpen(fee);
  if(!installment){fee.billing.autopay.status='expired';fee.billing.autopay.nextDebitAt=null;fee.billing.autopay.lastAttemptStatus='paid';await fee.save();return null;}
  if(new Date(installment.dueAt)>now){fee.billing.autopay.nextDebitAt=installment.dueAt;fee.billing.autopay.lastAttemptStatus='scheduled';await fee.save();return null;}
  const existing=await PaymentTransaction.findOne({successFee:fee._id,installmentNumber:installment.number,provider:'demo-autopay',status:{$in:['pending','paid']}}).sort({createdAt:-1});
  if(existing?.status==='paid'){refreshBillingSchedule(fee,now);const next=firstOpen(fee);fee.billing.autopay.nextDebitAt=next?.dueAt||null;fee.billing.autopay.lastAttemptStatus='paid';if(!next)fee.billing.autopay.status='expired';await fee.save();return existing;}
  fee.billing.autopay.lastAttemptAt=now;fee.billing.autopay.lastAttemptStatus='processing';fee.billing.autopay.lastFailureReason='';await fee.save();
  const transaction=existing||await PaymentTransaction.create({successFee:fee._id,candidate:fee.candidate,installmentNumber:installment.number,amount:installment.amount,currency:'INR',status:'pending',method:'gateway',provider:'demo-autopay',providerOrderId:demoId('demo_order')});
  if(shouldFail()){
    transaction.status='failed';transaction.providerPaymentId=demoId('demo_failed');transaction.notes='Portfolio AutoPay simulation failure. No real debit was attempted.';await transaction.save();
    fee.billing.autopay.lastAttemptStatus='failed';fee.billing.autopay.lastFailureReason='Simulated debit failure. Manual payment is available and the demo worker will retry on its next run.';fee.billing.autopay.nextDebitAt=new Date(now.getTime()+24*60*60*1000);await fee.save();
    await notifyFailure(fee,installment,fee.billing.autopay.lastFailureReason);return transaction;
  }
  const paymentId=demoId('demo_payment');
  const paid=await finalizeCapturedBillingPayment({transactionId:transaction._id,orderId:transaction.providerOrderId,paymentId,paidAt:now,method:'gateway'});
  paid.provider='demo-autopay';paid.notes='Portfolio AutoPay simulation. No real financial account was debited.';await paid.save();
  const updated=await SuccessFee.findById(fee._id);refreshBillingSchedule(updated,now);const next=firstOpen(updated);updated.billing.autopay.lastAttemptAt=now;updated.billing.autopay.lastAttemptStatus='paid';updated.billing.autopay.lastFailureReason='';updated.billing.autopay.nextDebitAt=next?.dueAt||null;if(!next)updated.billing.autopay.status='expired';await updated.save();return paid;
}

export function startDemoAutopayWorker(){
  if(process.env.NODE_ENV==='test'||!demoWorkerEnabled())return()=>{};
  let running=false;
  const execute=async()=>{if(running)return;running=true;try{const due=await SuccessFee.find({'billing.autopay.mode':'demo','billing.autopay.status':'active','billing.autopay.nextDebitAt':{$ne:null,$lte:new Date()},status:{$nin:['paid','waived','cancelled']}}).select('_id').limit(25).lean();for(const item of due){try{await executeDemoAutopay(item._id);}catch(error){console.error('Demo AutoPay execution failed:',error.message);}}}catch(error){console.error('Demo AutoPay worker failed:',error);}finally{running=false;}};
  const timer=setInterval(execute,60*60*1000);timer.unref?.();setTimeout(execute,5000).unref?.();return()=>clearInterval(timer);
}
