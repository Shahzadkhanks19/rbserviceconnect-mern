import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../../lib/api.js';

const logoUrl = 'https://media.githubusercontent.com/media/Shahzadkhanks19/rbserviceconnect/main/images/Royalties-Service-Connect.png';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!form.email.trim() || !form.password) {
      setError('Enter the admin email address and password.');
      return;
    }

    try {
      setSubmitting(true);
      const response = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: form.email.trim(), password: form.password }),
      });

      if (response?.user?.role !== 'admin') {
        await apiRequest('/auth/logout', { method: 'POST' });
        setError('This account does not have administrator access.');
        return;
      }

      navigate('/admin', { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 shadow-2xl shadow-black/40 lg:grid-cols-[.9fr_1.1fr]">
        <section className="hidden bg-[#879E83] p-10 text-slate-950 lg:flex lg:flex-col lg:justify-between">
          <div>
            <Link to="/" className="inline-flex rounded-2xl bg-[#879E83]" aria-label="Royalties Service Connect home">
              <img src={logoUrl} alt="Royalties Service Connect" className="h-20 w-auto object-contain" />
            </Link>
            <p className="mt-10 text-xs font-bold uppercase tracking-[0.22em] text-white/80">Administration</p>
            <h1 className="mt-4 max-w-md text-5xl font-semibold tracking-[-0.05em]">Secure platform control center.</h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-900/75">Review recruiter accounts, moderate platform access, and manage operational controls from a dedicated administrator workspace.</p>
          </div>

          <div className="rounded-3xl border border-white/30 bg-white/15 p-5">
            <div className="flex items-center gap-3 text-sm font-semibold"><ShieldCheck size={19} /> Restricted administrator access</div>
            <p className="mt-2 text-xs leading-5 text-slate-900/70">Only accounts with the admin role can continue beyond this screen.</p>
          </div>
        </section>

        <section className="flex items-center justify-center bg-slate-950 p-6 sm:p-10">
          <div className="w-full max-w-md">
            <div className="lg:hidden">
              <img src={logoUrl} alt="Royalties Service Connect" className="h-16 w-auto object-contain" />
            </div>
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-[#D9B24C] lg:mt-0">Admin portal</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">Administrator sign in</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">Use the credentials configured for the RB Service Connect administrator account.</p>

            {error && <div role="alert" className="mt-5 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}

            <form className="mt-7 space-y-5" onSubmit={handleSubmit} noValidate>
              <label className="block">
                <span className="text-sm font-semibold text-slate-200">Admin email</span>
                <span className="mt-2 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition focus-within:border-[#D9B24C]/60 focus-within:ring-4 focus-within:ring-[#D9B24C]/10">
                  <Mail size={18} className="shrink-0 text-slate-500" />
                  <input value={form.email} onChange={updateField('email')} type="email" autoComplete="username" className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-600" placeholder="admin@example.com" />
                </span>
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-200">Password</span>
                <span className="mt-2 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition focus-within:border-[#D9B24C]/60 focus-within:ring-4 focus-within:ring-[#D9B24C]/10">
                  <LockKeyhole size={18} className="shrink-0 text-slate-500" />
                  <input value={form.password} onChange={updateField('password')} type={showPassword ? 'text' : 'password'} autoComplete="current-password" className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-600" placeholder="Enter admin password" />
                  <button type="button" onClick={() => setShowPassword((current) => !current)} className="text-slate-500 transition hover:text-slate-300" aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                </span>
              </label>

              <button disabled={submitting} className="w-full rounded-xl bg-[#D9B24C] px-4 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-[#E2C46C] disabled:cursor-not-allowed disabled:opacity-60">{submitting ? 'Signing in…' : 'Sign in to admin'}</button>
            </form>

            <div className="mt-6 border-t border-white/10 pt-6 text-center">
              <Link to="/" className="text-sm font-semibold text-slate-400 transition hover:text-white">Return to public website</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
