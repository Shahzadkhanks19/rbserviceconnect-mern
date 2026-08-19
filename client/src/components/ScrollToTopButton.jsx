import { ArrowUp } from 'lucide-react';
import { useEffect,useState } from 'react';

export default function ScrollToTopButton(){
  const [visible,setVisible]=useState(false);
  useEffect(()=>{const update=()=>setVisible(window.scrollY>420);update();window.addEventListener('scroll',update,{passive:true});return()=>window.removeEventListener('scroll',update);},[]);
  if(!visible)return null;
  return <button type="button" onClick={()=>window.scrollTo({top:0,left:0,behavior:'smooth'})} aria-label="Scroll to top" title="Scroll to top" className="fixed bottom-5 right-4 z-50 grid size-12 place-items-center rounded-2xl border border-white/20 bg-slate-950 text-white shadow-xl shadow-slate-950/20 transition duration-300 hover:-translate-y-1 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200 sm:bottom-6 sm:right-6"><ArrowUp size={19} aria-hidden="true"/></button>;
}
