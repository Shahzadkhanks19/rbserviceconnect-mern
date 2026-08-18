export const CAREER_TERMS_VERSION='2026-08-18';
export const careerPrograms={
  'career-assist':{name:'RB Career Assist',successFeeAmount:9999,description:'Structured support for candidates who want help improving applications and converting interviews.',services:['Resume review & optimization','Profile optimization','Curated job matching','Interview preparation','Application guidance']},
  'career-pro':{name:'RB Career Pro',successFeeAmount:14999,description:'Hands-on placement assistance with human support throughout the hiring journey.',services:['Everything in Career Assist','Mock interviews','Priority recruiter introductions','Salary negotiation support','Dedicated career advisor']},
  'career-elite':{name:'RB Career Elite',successFeeAmount:24999,description:'High-touch career support for specialist, senior, or higher-value opportunities.',services:['Everything in Career Pro','Enhanced recruiter outreach','Advanced interview preparation','Priority advisor support','Offer strategy support']},
};
export const paymentPlans={full:{label:'Pay in full',installments:1,multiplier:1},'3-installments':{label:'3 instalments',installments:3,multiplier:1.05},'6-installments':{label:'6 instalments',installments:6,multiplier:1.10}};
export function publicCareerPrograms(){return Object.entries(careerPrograms).map(([id,p])=>({id,...p,paymentPlans:Object.entries(paymentPlans).map(([planId,plan])=>{const total=Math.round(p.successFeeAmount*plan.multiplier);return {id:planId,label:plan.label,installments:plan.installments,total,perInstallment:Math.ceil(total/plan.installments)};})}));}
