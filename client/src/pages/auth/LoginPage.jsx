import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../../lib/api.js';

export default function LoginPage() {
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
      setError('Enter your email address and password.');
      return;
    }

    try {
      setSubmitting(true);
      const response = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: form.email.trim(), password: form.password }),
      });
      const role = response?.user?.role;

      if (role === 'admin') {
        await apiRequest('/auth/logout', { method: 'POST' });
        setError('Administrator accounts must use the dedicated admin portal.');
        return;
      }

      navigate(role === 'recruiter' ? '/recruiter' : '/candidate', { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-slate-50 py-10 sm:py-14">
      <div className="mx-auto grid min-h-[70vh] max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
        <div className="hidden rounded-[2rem] bg-[#879E83] p-10 text-slate-950 lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">Royalties Service Connect</p>
            <h1 className="mt-5 max-w-xl text-5xl font-semibold tracking-[-0.05em]">Your next move stays organized.</h1>
            <p className="mt-5 max-w-lg text-base leading-8 text-slate-900/75">Candidates can manage applications and recruiters can run hiring workflows from one secure workspace.</p>
          </div>
          <div className="grid gap-3 xl:grid-cols-3">
            {['Secure cookie sessions', 'Role-based workspaces', 'Recruiter verification'].map((item) => (
              <div key={item} className="rounded-2xl border border-white/25 bg-white/15 p-4 text-sm font-semibold"><ShieldCheck size={18} className="mb-3" /> {item}</div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full max-w-lg rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-black/5 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-700">Welcome back</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">Sign in to your workspace.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">Use the email and password attached to your RB Service Connect account.</p>
            {error && <div role="alert" className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

            <form className="mt-7 space-y-5" onSubmit={handleSubmit} noValidate>
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Email address</span>
                <span className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100">
                  <Mail size={18} className="shrink-0 text-slate-400" />
                  <input value={form.email} onChange={updateField('email')} type="email" autoComplete="email" className="min-w-0 flex-1 bg-transparent text-sm outline-none" placeholder="you@example.com" />
                </span>
              </label>

              <label className="block">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-slate-700">Password</span>
                  <Link to="/forgot-password" className="text-xs font-semibold text-indigo-700 hover:text-indigo-600">Forgot password?</Link>
                </div>
                <span className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100">
                  <LockKeyhole size={18} className="shrink-0 text-slate-400" />
                  <input value={form.password} onChange={updateField('password')} type={showPassword ? 'text' : 'password'} autoComplete="current-password" className="min-w-0 flex-1 bg-transparent text-sm outline-none" placeholder="Enter your password" />
                  <button type="button" onClick={() => setShowPassword((current) => !current)} className="text-slate-400 transition hover:text-slate-700" aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                </span>
              </label>

              <button disabled={submitting} className="w-full rounded-xl bg-indigo-500 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-900/10 transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60">{submitting ? 'Signing in…' : 'Sign in'}</button>
            </form>

            <div className="mt-6 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">New to RB Service Connect? <Link to="/register" className="font-semibold text-indigo-700 hover:text-indigo-600">Create an account</Link></div>
          </div>
        </div>
      </div>
    </section>
  );
}
