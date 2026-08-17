import { BriefcaseBusiness, Menu } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

const navItems = [
  ['/', 'Home'],
  ['/jobs', 'Find Jobs'],
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="RB Service Connect home">
          <span className="grid size-10 place-items-center rounded-xl bg-slate-950 text-white shadow-sm"><BriefcaseBusiness size={20} /></span>
          <span><strong className="block text-sm tracking-tight text-slate-950">RB Service Connect</strong><span className="block text-xs text-slate-500">Careers that connect</span></span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {navItems.map(([to, label]) => <NavLink key={to} to={to} className={({ isActive }) => `text-sm font-medium transition ${isActive ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-950'}`}>{label}</NavLink>)}
          <Link to="/login" className="text-sm font-semibold text-slate-700 hover:text-slate-950">Sign in</Link>
          <Link to="/register" className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500">Get started</Link>
        </nav>
        <button className="grid size-10 place-items-center rounded-xl border border-slate-200 md:hidden" aria-label="Open navigation"><Menu size={19} /></button>
      </div>
    </header>
  );
}
