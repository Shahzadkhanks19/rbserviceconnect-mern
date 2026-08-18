export const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phonePattern=/^[6-9]\d{9}$/;
export const urlPattern=/^https?:\/\/[^\s]+$/i;

export const trim=(value)=>String(value??'').trim();
export const isEmail=(value)=>emailPattern.test(trim(value));
export const isPhone=(value)=>phonePattern.test(trim(value).replace(/\D/g,''));
export const isUrl=(value)=>!trim(value)||urlPattern.test(trim(value));
export const passwordStrength=(value)=>({length:String(value||'').length>=8&&String(value||'').length<=128,letter:/[A-Za-z]/.test(String(value||'')),number:/\d/.test(String(value||'')),symbol:/[^A-Za-z0-9]/.test(String(value||''))});
export const fieldClass=(error,base='w-full rounded-2xl border bg-white/95 px-4 py-3.5 text-sm text-slate-950 shadow-[0_8px_30px_rgba(15,23,42,0.04)] outline-none transition placeholder:text-slate-400 hover:border-slate-300')=>`${base} ${error?'border-rose-300 focus:border-rose-400 focus:ring-4 focus:ring-rose-100':'border-slate-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100'}`;
export const serverFieldErrors=(error)=>error?.body?.errors&&typeof error.body.errors==='object'?error.body.errors:{};
export function validateRequired(value,label,min=1,max=Infinity){const clean=trim(value);if(!clean)return `${label} is required.`;if(clean.length<min)return `${label} must be at least ${min} characters.`;if(clean.length>max)return `${label} must be ${max} characters or fewer.`;return '';}
export function firstError(errors){return Object.values(errors).find(Boolean)||'';}
