import { LayoutDashboard, LogOut, Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { apiRequest } from '../lib/api.js';

const logoUrl = 'https://media.githubusercontent.com/media/Shahzadkhanks19/rbserviceconnect/main/images/Royalties-Service-Connect.png';

export default function DashboardLayout({ role }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const expectedRole = role.toLowerCase();

  useEffect(() => {
    let cancelled = false;

    const verifySession = async () => {
      try {
        const response = await apiRequest('/auth/me');
        if (cancelled) return;

        if (response?.user?.role !== expectedRole) {
          navigate(`/${response?.user?.role || ''}`, { replace: true });
          return;
        }

        setUser(response.user);
      } catch {
        if (!cancelled) navigate('/login', { replace: true });
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    verifySession();
    return () => {
      cancelled = true;
    };
  }, [expectedRole, navigate]);

  const handleLogout = async () => {
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
    } finally {
      navigate('/login', { replace: true });
    }
  };

  if (loading) {
    return <div className="grid min-h-screen place-items-center bg-slate-100 text-sm font-medium text-slate-500">Checking your session…</div>;
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-100 lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="hidden border-r border-slate-800 bg-slate-950 p-5 text-white lg:flex lg:flex-col">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl bg-[#879E83] p-1.5">
            <img src={logoUrl} alt="Royalties Service Connect" className="h-full w-full object-contain" />
          </span>
          <span>
            <strong className="block text-sm">RB Service Connect</strong>
            <span className="text-xs text-slate-400">{role} workspace</span>
          </span>
        </Link>

        <nav className="mt-8">
          <Link to={`/${expectedRole}`} className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-medium">
            <LayoutDashboard size={18} /> Overview
          </Link>
        </nav>

        <div className="mt-auto border-t border-white/10 pt-5">
          <p className="px-4 text-xs text-slate-500">Signed in as</p>
          <p className="mt-1 truncate px-4 text-sm font-medium text-slate-300">{user.email}</p>
          <button type="button" onClick={handleLogout} className="mt-3 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white">
            <LogOut size={18} /> Sign out
          </button>
        </div>
      </aside>

      <main className="min-w-0">
        <header className="flex min-h-18 items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
          <div>
            <p className="text-xs font-medium text-slate-500">RB Service Connect</p>
            <h1 className="text-lg font-semibold">{role} Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-right sm:block">
              <strong className="block text-sm text-slate-800">{user.firstName} {user.lastName}</strong>
              <span className="text-xs capitalize text-slate-500">{user.role}</span>
            </span>
            <button type="button" className="grid size-10 place-items-center rounded-xl border border-slate-200 lg:hidden" aria-label="Open dashboard navigation">
              <Menu size={19} />
            </button>
          </div>
        </header>
        <div className="p-4 sm:p-6 lg:p-8"><Outlet /></div>
      </main>
    </div>
  );
}
