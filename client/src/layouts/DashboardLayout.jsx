import { Bookmark, BriefcaseBusiness, FileText, LayoutDashboard, LogOut, Menu, Settings, UserRound, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { apiRequest } from '../lib/api.js';

const logoUrl = 'https://media.githubusercontent.com/media/Shahzadkhanks19/rbserviceconnect/main/images/Royalties-Service-Connect.png';
const candidateNav = [['','Overview',LayoutDashboard],['profile','Profile',UserRound],['resume','Resume',FileText],['saved-jobs','Saved jobs',Bookmark],['applications','Applications',BriefcaseBusiness],['settings','Settings',Settings]];
const defaultNav = [['','Overview',LayoutDashboard]];

function DashboardNav({role,expectedRole,navItems,user,onClose,onLogout}){
  return <><Link to="/" className="flex items-center gap-3" onClick={onClose}><span className="grid size-11 place-items-center rounded-xl bg-[#879E83] p-1.5"><img src={logoUrl} alt="Royalties Service Connect" className="h-full w-full object-contain"/></span><span><strong className="block text-sm">RB Service Connect</strong><span className="text-xs text-slate-400">{role} workspace</span></span></Link><nav className="mt-8 space-y-1.5">{navItems.map(([path,label,Icon])=>{const to=path?`/${expectedRole}/${path}`:`/${expectedRole}`;return <NavLink key={to} to={to} end={!path} onClick={onClose} className={({isActive})=>`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${isActive?'bg-[#E3A341] text-white shadow-lg shadow-black/10':'text-slate-400 hover:bg-white/5 hover:text-white'}`}><Icon size={18}/>{label}</NavLink>;})}</nav><div className="mt-auto border-t border-white/10 pt-5"><p className="px-4 text-xs text-slate-500">Signed in as</p><p className="mt-1 truncate px-4 text-sm font-medium text-slate-300">{user.email}</p><button type="button" onClick={onLogout} className="mt-3 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"><LogOut size={18}/> Sign out</button></div></>;
}

export default function DashboardLayout({ role, loginPath = '/login' }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const expectedRole = role.toLowerCase();
  const navItems = expectedRole === 'candidate' ? candidateNav : defaultNav;

  useEffect(() => {
    let cancelled = false;
    const verifySession = async () => {
      try {
        const response = await apiRequest('/auth/me');
        if (cancelled) return;
        if (response?.user?.role !== expectedRole) {
          navigate(response?.user?.role === 'admin' ? '/admin' : `/${response?.user?.role || ''}`, { replace: true });
          return;
        }
        setUser(response.user);
      } catch {
        if (!cancelled) navigate(loginPath, { replace: true });
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    verifySession();
    return () => { cancelled = true; };
  }, [expectedRole, loginPath, navigate]);

  const handleLogout = async () => { try { await apiRequest('/auth/logout', { method: 'POST' }); } finally { navigate(loginPath, { replace: true }); } };
  if (loading) return <div className="grid min-h-screen place-items-center bg-slate-100 text-sm font-medium text-slate-500">Checking your session…</div>;
  if (!user) return null;
  const navProps={role,expectedRole,navItems,user,onClose:()=>setMobileOpen(false),onLogout:handleLogout};

  return <div className="min-h-screen bg-[#F5F7F8] lg:grid lg:grid-cols-[272px_1fr]">
    <aside className="hidden min-h-screen border-r border-slate-800 bg-slate-950 p-5 text-white lg:flex lg:flex-col"><DashboardNav {...navProps}/></aside>
    {mobileOpen&&<div className="fixed inset-0 z-[70] lg:hidden"><button className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm" aria-label="Close navigation" onClick={()=>setMobileOpen(false)}/><aside className="relative flex h-full w-[86%] max-w-xs flex-col bg-slate-950 p-5 text-white shadow-2xl"><button type="button" onClick={()=>setMobileOpen(false)} className="absolute right-4 top-4 grid size-9 place-items-center rounded-lg bg-white/10" aria-label="Close navigation"><X size={18}/></button><DashboardNav {...navProps}/></aside></div>}
    <main className="min-w-0"><header className="sticky top-0 z-40 flex min-h-18 items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-xl sm:px-6"><div><p className="text-xs font-medium text-slate-500">RB Service Connect</p><h1 className="text-lg font-semibold">{role} Workspace</h1></div><div className="flex items-center gap-3"><span className="hidden text-right sm:block"><strong className="block text-sm text-slate-800">{user.firstName} {user.lastName}</strong><span className="text-xs capitalize text-slate-500">{user.role}</span></span><button type="button" onClick={()=>setMobileOpen(true)} className="grid size-10 place-items-center rounded-xl border border-slate-200 lg:hidden" aria-label="Open dashboard navigation"><Menu size={19}/></button></div></header><div className="p-4 sm:p-6 lg:p-8"><Outlet context={{user,setUser}}/></div></main>
  </div>;
}
