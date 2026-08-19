import { useEffect,useState } from 'react';
import { Outlet,useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import { apiRequest } from '../lib/api.js';

export default function MemberLayout({role}){
  const navigate=useNavigate();
  const [user,setUser]=useState(null);
  const [loading,setLoading]=useState(true);
  const expectedRole=role.toLowerCase();

  useEffect(()=>{let cancelled=false;async function verify(){try{const response=await apiRequest('/auth/me');if(cancelled)return;const actual=response?.user?.role;if(actual!==expectedRole){navigate(actual==='admin'?'/admin':actual?`/${actual}`:'/login',{replace:true});return;}setUser(response.user);}catch{if(!cancelled)navigate('/login',{replace:true});}finally{if(!cancelled)setLoading(false);}}verify();return()=>{cancelled=true;};},[expectedRole,navigate]);

  if(loading)return <div className="grid min-h-screen place-items-center bg-slate-50" role="status" aria-live="polite"><div className="text-center"><span className="mx-auto block size-9 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-500" aria-hidden="true"/><p className="mt-4 text-sm font-medium text-slate-500">Checking your session…</p></div></div>;
  if(!user)return null;

  return <div className="min-h-screen bg-[#F5F7F8] text-slate-950"><a href="#main-content" className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-transform focus:translate-y-0">Skip to workspace content</a><Header sessionUser={user}/><main id="main-content" tabIndex="-1" className="mx-auto min-h-[calc(100vh-5rem)] max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8"><Outlet context={{user,setUser}}/></main></div>;
}
