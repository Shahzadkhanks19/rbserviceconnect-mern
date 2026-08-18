export const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phonePattern=/^[6-9]\d{9}$/;
export const urlPattern=/^https?:\/\/[^\s]+$/i;
export const clean=(value,max=Infinity)=>String(value??'').trim().slice(0,max);
export const validEmail=(value)=>emailPattern.test(clean(value,254).toLowerCase());
export const validPhone=(value)=>phonePattern.test(clean(value,20).replace(/\D/g,''));
export const validUrl=(value)=>!clean(value)||urlPattern.test(clean(value,500));
export const validPassword=(value)=>typeof value==='string'&&value.length>=8&&value.length<=128&&/[A-Za-z]/.test(value)&&/\d/.test(value);
export function validationError(res,errors,message='Please correct the highlighted fields.'){return res.status(400).json({message,errors});}
export function required(value,label,min=1,max=Infinity){const next=clean(value,max);if(!next)return `${label} is required.`;if(next.length<min)return `${label} must be at least ${min} characters.`;if(next.length>max)return `${label} must be ${max} characters or fewer.`;return '';}
