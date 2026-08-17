import { AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';

const icons={danger:AlertTriangle,success:CheckCircle2,info:Info};
export default function ActionModal({open,title,description,confirmLabel='Continue',cancelLabel='Cancel',tone='info',onConfirm,onClose,busy=false,children}){
  if(!open)return null;
  const Icon=icons[tone]||Info;
  const confirmClass=tone==='danger'?'bg-red-600 hover:bg-red-500':'bg-[#E3A341] hover:bg-[#d79431]';
  return <div className="fixed inset-0 z-[120] grid place-items-center bg-slate-950/50 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event)=>{if(event.target===event.currentTarget&&!busy)onClose?.();}}>
    <section role="dialog" aria-modal="true" aria-labelledby="action-modal-title" className="w-full max-w-md rounded-[1.75rem] border border-white/50 bg-white p-5 shadow-2xl sm:p-6">
      <div className="flex items-start gap-4"><span className={`grid size-11 shrink-0 place-items-center rounded-2xl ${tone==='danger'?'bg-red-50 text-red-600':'bg-[#F3E8A2]/70 text-indigo-700'}`}><Icon size={20}/></span><div className="min-w-0 flex-1"><h2 id="action-modal-title" className="text-xl font-semibold tracking-[-.025em] text-slate-950">{title}</h2>{description&&<p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>}</div><button type="button" onClick={onClose} disabled={busy} aria-label="Close dialog" className="grid size-9 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 disabled:opacity-50"><X size={17}/></button></div>
      {children&&<div className="mt-5">{children}</div>}
      <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><button type="button" onClick={onClose} disabled={busy} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50">{cancelLabel}</button>{onConfirm&&<button type="button" onClick={onConfirm} disabled={busy} className={`rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition disabled:opacity-50 ${confirmClass}`}>{busy?'Please wait…':confirmLabel}</button>}</div>
    </section>
  </div>;
}
