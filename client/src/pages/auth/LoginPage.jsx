import { ArrowRight, BriefcaseBusiness, CheckCircle2, Eye, EyeOff, LockKeyhole, Mail, MailCheck, ShieldCheck, Sparkles, UserRound } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../../lib/api.js';
import { firstError, isEmail, serverFieldErrors, trim } from '../../lib/validation.js';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [verificationEmail, setVerificationEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
    if (error) setError('');
    if (verificationEmail) setVerificationEmail('');
  };
  const validate = () => {
    const next = {
      email: !trim(form.email) ? 'Email address is required.' : !isEmail(form.email) ? 'Enter a valid email address.' : '',
      password: !form.password ? 'Password is required.' : form.password.length > 128 ? 'Password is too long.' : '',
    };
    setErrors(next);
    return !firstError(next);
  };
  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setVerificationEmail('');
    if (!validate()) return;
    try {
      setSubmitting(true);
      const response = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: trim(form.email).toLowerCase(), password: form.password }),
      });
      const role = response?.user?.role;
      if (role === 'admin') {
        await apiRequest('/auth/logout', { method: 'POST' });
        setError('Administrator accounts must use the dedicated admin portal.');
        return;
      }
      navigate(role === 'recruiter' ? '/recruiter' : '/candidate', { replace: true });
    } catch (requestError) {
      setErrors((current) => ({ ...current, ...serverFieldErrors(requestError) }));
      setError(requestError.message);
      if (requestError?.body?.code === 'EMAIL_NOT_VERIFIED') {
        setVerificationEmail(requestError.body.email || trim(form.email).toLowerCase());
      }
    } finally {
      setSubmitting(false);
    }
  };

  return <section className="relative overflow-hidden bg-[#F7F8F5] py-8 sm:py-12 lg:py-16"><div className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-[#F3E8A2]/45 blur-3xl"/><div className="pointer-events-none absolute -right-24 bottom-0 size-80 rounded-full bg-[#879E83]/20 blur-3xl"/><div className="relative mx-auto grid min-h-[720px] max-w-7xl overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_30px_90px_-45px_rgba(15,23,42,.35)] lg:grid-cols-[1.02fr_.98fr]"><aside className="relative hidden overflow-hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-12"><div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(135,158,131,.38),transparent_35%),radial-gradient(circle_at_85%_80%,rgba(227,163,65,.18),transparent_30%)]"/><div className="relative"><span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-200"><Sparkles size={14} className="text-[#E3A341]"/> Your connected workspace</span><h1 className="mt-8 max-w-xl text-5xl font-semibold leading-[1.04] tracking-[-0.055em] xl:text-6xl">Continue from opportunity to outcome.</h1><p className="mt-6 max-w-lg text-base leading-8 text-slate-300">Return to the recruitment workspace tied to your account—complete with profiles, jobs, applications, interviews, conversations, placements and account activity.</p><div className="mt-10 grid gap-3 sm:grid-cols-2"><div className="rounded-3xl border border-white/10 bg-white/[.06] p-5 transition hover:-translate-y-0.5 hover:bg-white/[.09]"><UserRound size={22} className="text-[#F3E8A2]"/><p className="mt-4 font-semibold">Candidate workspace</p><p className="mt-1 text-xs leading-5 text-slate-400">Profile, resume, jobs, alerts, applications, interviews, messages, career programmes and billing.</p></div><div className="rounded-3xl border border-white/10 bg-white/[.06] p-5 transition hover:-translate-y-0.5 hover:bg-white/[.09]"><BriefcaseBusiness size={22} className="text-[#F3E8A2]"/><p className="mt-4 font-semibold">Recruiter workspace</p><p className="mt-1 text-xs leading-5 text-slate-400">Company, jobs, applicants, candidate discovery, talent pools, interviews, placements and promotions.</p></div></div></div><div className="relative flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-xs font-medium text-slate-400">{['Secure sessions','Role-aware access','Verified workflows'].map((item)=><span key={item} className="inline-flex items-center gap-2"><CheckCircle2 size={14} className="text-[#879E83]"/>{item}</span>)}</div></aside><div className="flex items-center justify-center p-5 sm:p-9 lg:p-12 xl:p-16"><div className="w-full max-w-md"><div className="mb-9 flex items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#667C63]">Welcome back</p><h2 className="mt-2 text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-4xl">Sign in</h2></div><span className="grid size-12 place-items-center rounded-2xl bg-[#F3E8A2]/60 text-slate-800"><ShieldCheck size={22}/></span></div><p className="-mt-4 mb-7 text-sm leading-6 text-slate-500">Continue securely to the candidate or recruiter workspace associated with your account.</p>{error&&<div role="alert" className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"><p>{error}</p>{verificationEmail&&<Link to={`/verify-email?email=${encodeURIComponent(verificationEmail)}`} className="mt-3 inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2.5 text-xs font-semibold text-red-700 shadow-sm ring-1 ring-red-200 transition hover:-translate-y-0.5 hover:bg-red-100"><MailCheck size={15}/> Verify email address</Link>}</div>}<form className="space-y-5" onSubmit={submit} noValidate><Field label="Email address" error={errors.email} icon={Mail}><input value={form.email} onChange={(event)=>update('email',event.target.value)} onBlur={validate} maxLength="254" type="email" autoComplete="email" className="w-full bg-transparent py-3.5 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400" placeholder="you@example.com"/></Field><div><div className="mb-2 flex items-center justify-between gap-4"><span className="text-sm font-semibold text-slate-700">Password</span><Link to="/forgot-password" className="text-xs font-semibold text-[#667C63] transition hover:text-indigo-700">Forgot password?</Link></div><div className={`flex items-center rounded-2xl border bg-slate-50/70 transition focus-within:bg-white focus-within:ring-4 ${errors.password?'border-red-300 focus-within:ring-red-100':'border-slate-200 focus-within:border-[#879E83] focus-within:ring-[#879E83]/15'}`}><span className="pl-4 text-slate-400"><LockKeyhole size={18}/></span><input value={form.password} onChange={(event)=>update('password',event.target.value)} onBlur={validate} maxLength="128" type={showPassword?'text':'password'} autoComplete="current-password" className="min-w-0 flex-1 bg-transparent px-3 py-3.5 text-sm outline-none" placeholder="Enter your password"/><button type="button" onClick={()=>setShowPassword((current)=>!current)} className="mr-2 grid size-9 place-items-center rounded-xl text-slate-400 transition hover:bg-white hover:text-emerald-700" aria-label={showPassword?'Hide password':'Show password'}>{showPassword?<EyeOff size={18}/>:<Eye size={18}/>}</button></div>{errors.password&&<p className="mt-1.5 text-xs font-medium text-red-600">{errors.password}</p>}</div><button disabled={submitting} className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-4 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-[#667C63] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60">{submitting?'Signing in…':'Continue to workspace'}{!submitting&&<ArrowRight size={17} className="transition-transform group-hover:translate-x-1"/>}</button></form><div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-center text-sm text-slate-500">New to RB Service Connect? <Link to="/register" className="font-semibold text-slate-950 transition hover:text-emerald-700">Create your account</Link></div><p className="mt-5 text-center text-xs text-slate-400">Administrator? <Link to="/admin/login" className="font-semibold text-slate-600 transition hover:text-indigo-700">Use secure admin access</Link></p></div></div></div></section>;
}
function Field({ label,error='',icon:Icon,children }){return <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span><span className={`flex items-center rounded-2xl border bg-slate-50/70 transition focus-within:bg-white focus-within:ring-4 ${error?'border-red-300 focus-within:ring-red-100':'border-slate-200 focus-within:border-[#879E83] focus-within:ring-[#879E83]/15'}`}><span className="pl-4 text-slate-400"><Icon size={18}/></span><span className="min-w-0 flex-1 pl-3">{children}</span></span>{error&&<span className="mt-1.5 block text-xs font-medium text-red-600">{error}</span>}</label>}
