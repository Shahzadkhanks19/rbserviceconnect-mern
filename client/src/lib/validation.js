export const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phonePattern=/^[6-9]\d{9}$/;
export const urlPattern=/^https?:\/\/[^\s]+$/i;

export const trim=(value)=>String(value??'').trim();
export const isEmail=(value)=>emailPattern.test(trim(value));
export const isPhone=(value)=>phonePattern.test(trim(value).replace(/\D/g,''));
export const isUrl=(value)=>!trim(value)||urlPattern.test(trim(value));
export const passwordStrength=(value)=>({length:String(value||'').length>=8&&String(value||'').length<=128,letter:/[A-Za-z]/.test(String(value||'')),number:/\d/.test(String(value||'')),symbol:/[^A-Za-z0-9]/.test(String(value||''))});
export const fieldClass=(error,base='w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition')=>`${base} ${error?'border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100':'border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100'}`;
export const serverFieldErrors=(error)=>error?.body?.errors&&typeof error.body.errors==='object'?error.body.errors:{};
export function validateRequired(value,label,min=1,max=Infinity){const clean=trim(value);if(!clean)return `${label} is required.`;if(clean.length<min)return `${label} must be at least ${min} characters.`;if(clean.length>max)return `${label} must be ${max} characters or fewer.`;return '';}
export function firstError(errors){return Object.values(errors).find(Boolean)||'';}
