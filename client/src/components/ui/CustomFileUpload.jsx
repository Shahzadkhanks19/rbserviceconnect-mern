import { FileText, UploadCloud, X } from 'lucide-react';
import { useRef } from 'react';

export default function CustomFileUpload({label='Upload file',hint='',accept='',file,onChange,error='',disabled=false}){
  const ref=useRef(null);
  const choose=()=>{if(!disabled)ref.current?.click();};
  return <div>
    {label&&<p className="mb-2 text-sm font-semibold text-slate-800">{label}</p>}
    <button type="button" onClick={choose} disabled={disabled} className={`group flex w-full items-center gap-4 rounded-[1.35rem] border-2 border-dashed bg-gradient-to-br from-white to-slate-50 px-5 py-5 text-left shadow-[0_12px_36px_rgba(15,23,42,0.05)] transition ${error?'border-rose-300 hover:border-rose-400':'border-slate-200 hover:border-amber-400 hover:bg-amber-50/30'} disabled:cursor-not-allowed disabled:opacity-50`}>
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-amber-50 text-amber-700 transition group-hover:bg-amber-100"><UploadCloud size={22}/></span>
      <span className="min-w-0 flex-1"><strong className="block truncate text-sm text-slate-900">{file?.name||'Choose file from device'}</strong><span className="mt-1 block text-xs leading-5 text-slate-500">{file?`${(file.size/1024/1024).toFixed(2)} MB selected`:hint||'Browse your device to select a file'}</span></span>
      {file?<span className="grid size-9 place-items-center rounded-xl bg-white text-slate-500 shadow-sm"><FileText size={17}/></span>:null}
    </button>
    <input ref={ref} type="file" accept={accept} onChange={(event)=>onChange?.(event.target.files?.[0]||null,event)} className="hidden"/>
    {file&&<button type="button" onClick={()=>{if(ref.current)ref.current.value='';onChange?.(null);}} className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-rose-600"><X size={13}/>Clear selected file</button>}
    {error?<p className="mt-1.5 text-xs font-medium text-rose-600" role="alert">{error}</p>:null}
  </div>;
}
