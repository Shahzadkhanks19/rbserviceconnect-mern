import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const navItems = [
  ['/', 'Home'],
  ['/jobs', 'Find Jobs'],
  ['/companies', 'Companies'],
  ['/about', 'About'],
];

const logoUrl = '/images/rb-service-connect-logo.webp';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center" aria-label="RB Service Connect home" onClick={closeMenu}>
          <img src={logoUrl} alt="RB Service Connect" className="h-10 w-auto object-contain sm:h-11" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
          {navItems.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors ${isActive ? 'text-blue-600' : 'text-slate-600 hover:text-slate-950'}`
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
          <Link to="/register?role=recruiter" className="rounded-xl border border-blue-200 px-4 py-2.5 text-sm font-semibold text-blue-800 transition hover:border-blue-300 hover:bg-blue-50">
            For employers
          </Link>
          <Link to="/register" className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-500">
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
                  `rounded-xl px-4 py-3 text-sm font-semibold ${isActive ? 'bg-blue-50 text-blue-800' : 'text-slate-700 hover:bg-slate-50'}`
                }
              >
                {label}
              </NavLink>
            ))}
            <div className="mt-3 grid gap-2 border-t border-slate-200 pt-4 sm:grid-cols-3">
              <Link to="/login" onClick={closeMenu} className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700">
                Sign in
              </Link>
              <Link to="/register?role=recruiter" onClick={closeMenu} className="rounded-xl border border-blue-200 px-4 py-3 text-center text-sm font-semibold text-blue-800">
                For employers
              </Link>
              <Link to="/register" onClick={closeMenu} className="rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white">
                Create account
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
