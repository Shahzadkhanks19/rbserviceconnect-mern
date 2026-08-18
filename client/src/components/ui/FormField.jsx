import { forwardRef } from 'react';

const shell=(error,disabled)=>`w-full rounded-2xl border bg-white/95 px-4 py-3.5 text-sm text-slate-950 shadow-[0_8px_30px_rgba(15,23,42,0.04)] outline-none transition placeholder:text-slate-400 ${disabled?'cursor-not-allowed bg-slate-100 text-slate-400':'hover:border-slate-300'} ${error?'border-rose-300 focus:border-rose-400 focus:ring-4 focus:ring-rose-100':'border-slate-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100'}`;

export function FormField({label,hint,error,required=false,className='',children}){return <label className={`block ${className}`}><span className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-slate-800">{label}{required&&<span className="text-rose-500" aria-hidden="true">*</span>}</span>{children}{error?<span className="mt-1.5 block text-xs font-medium text-rose-600" role="alert">{error}</span>:hint?<span className="mt-1.5 block text-xs leading-5 text-slate-500">{hint}</span>:null}</label>}

export const FormInput=forwardRef(function FormInput({error,className='',disabled=false,...props},ref){return <input ref={ref} disabled={disabled} aria-invalid={Boolean(error)} className={`${shell(error,disabled)} ${className}`} {...props}/>;});

export const FormTextarea=forwardRef(function FormTextarea({error,className='',disabled=false,...props},ref){return <textarea ref={ref} disabled={disabled} aria-invalid={Boolean(error)} className={`${shell(error,disabled)} resize-y ${className}`} {...props}/>;});

export function FormPanel({title,description,children,className=''}){return <div className={`rounded-[1.75rem] border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/70 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-6 ${className}`}><div className="mb-5"><h3 className="text-lg font-semibold tracking-[-.02em] text-slate-950">{title}</h3>{description&&<p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>}</div>{children}</div>}
