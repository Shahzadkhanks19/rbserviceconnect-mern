import { Eye, EyeOff, LockKeyhole } from 'lucide-react';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { apiRequest } from '../../lib/api.js';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!token) return setError('This reset link is invalid. Request a new password reset link.');
    if (password.length < 8) return setError('Password must be at least 8 characters.');
    if (password !== confirmPassword) return setError('Passwords do not match.');
    try {
      setSubmitting(true);
      const response = await apiRequest('/auth/reset-password', { method: 'POST', body: JSON.stringify({ token, password }) });
      setSuccess(response?.message || 'Password reset successfully.');
      setPassword('');
      setConfirmPassword('');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return <section className="bg-slate-50 py-14"><div className="mx-auto max-w-xl px-4 sm:px-6"><div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl shadow-black/5 sm:p-9"><p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-700">Choose a new password</p><h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">Secure your account again.</h1><p className="mt-3 text-sm leading-6 text-slate-500">Create a new password with at least 8 characters.</p>{error&&<div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}{success&&<div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{success} <Link to="/login" className="font-bold underline">Sign in</Link>.</div>}{!success&&<form onSubmit={handleSubmit} className="mt-7 space-y-5"><label className="block"><span className="text-sm font-semibold text-slate-700">New password</span><span className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100"><LockKeyhole size={18} className="text-slate-400"/><input value={password} onChange={(e)=>setPassword(e.target.value)} type={showPassword?'text':'password'} autoComplete="new-password" className="min-w-0 flex-1 bg-transparent text-sm outline-none" placeholder="At least 8 characters"/><button type="button" onClick={()=>setShowPassword((v)=>!v)} className="text-slate-400" aria-label={showPassword?'Hide password':'Show password'}>{showPassword?<EyeOff size={18}/>:<Eye size={18}/>}</button></span></label><label className="block"><span className="text-sm font-semibold text-slate-700">Confirm new password</span><input value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} type="password" autoComplete="new-password" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100" placeholder="Repeat password"/></label><button disabled={submitting} className="w-full rounded-xl bg-indigo-500 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:opacity-60">{submitting?'Updating password…':'Update password'}</button></form>}</div></div></section>;
}
