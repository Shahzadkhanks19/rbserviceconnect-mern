import { BriefcaseBusiness, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const navItems = [
  ['/', 'Home'],
  ['/jobs', 'Find Jobs'],
  ['/companies', 'Companies'],
  ['/about', 'About'],
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="RB Service Connect home" onClick={closeMenu}>
          <span className="grid size-11 place-items-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/10">
            <BriefcaseBusiness size={21} strokeWidth={1.9} />
          </span>
          <span>
            <strong className="block text-[15px] font-bold tracking-[-0.02em] text-slate-950">RB Service Connect</strong>
            <span className="block text-[11px] font-medium tracking-wide text-slate-500">Talent. Opportunity. Growth.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
          {navItems.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-950'}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/login" className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950">
            Sign in
          </Link>
          <Link to="/register?role=recruiter" className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
            For employers
          </Link>
          <Link to="/register" className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500">
            Create account
          </Link>
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 lg:hidden"
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-4 pb-5 pt-3 shadow-xl shadow-slate-950/5 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1" aria-label="Mobile navigation">
            {navItems.map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-semibold ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'}`
                }
              >
                {label}
              </NavLink>
            ))}
            <div className="mt-3 grid gap-2 border-t border-slate-200 pt-4 sm:grid-cols-3">
              <Link to="/login" onClick={closeMenu} className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700">
                Sign in
              </Link>
              <Link to="/register?role=recruiter" onClick={closeMenu} className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700">
                For employers
              </Link>
              <Link to="/register" onClick={closeMenu} className="rounded-xl bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white">
                Create account
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
