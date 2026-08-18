import { ArrowLeft, Eye, EyeOff, Fingerprint, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../../lib/api.js';
import { isEmail, trim } from '../../lib/validation.js';

const logoUrl = 'https://media.githubusercontent.com/media/Shahzadkhanks19/rbserviceconnect/main/images/Royalties-Service-Connect.png';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: '' }));
    if (error) setError('');
  };

  const validate = () => {
    const next = {
      email: !trim(form.email) ? 'Admin email is required.' : !isEmail(form.email) ? 'Enter a valid email address.' : '',
      password: !form.password ? 'Password is required.' : form.password.length > 128 ? 'Password is too long.' : '',
    };
    setErrors(next);
    return !next.email && !next.password;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!validate()) return;
    try {
      setSubmitting(true);
      const response = await apiRequest('/auth/login', { method: 'POST', body: JSON.stringify({ email: trim(form.email).toLowerCase(), password: form.password }) });
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

  return <main className="relative min-h-screen overflow-hidden bg-[#080D16] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
    <div className="pointer-events-none absolute left-0 top-0 size-[32rem] -translate-x-1/3 -translate-y-1/3 rounded-full bg-[#879E83]/20 blur-3xl" />
    <div className="pointer-events-none absolute bottom-0 right-0 size-[28rem] translate-x-1/3 translate-y-1/3 rounded-full bg-[#D9B24C]/10 blur-3xl" />
    <div className="relative mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0D1421] shadow-2xl shadow-black/50 lg:grid-cols-[1.04fr_.96fr]">
      <section className="relative hidden overflow-hidden border-r border-white/10 p-10 lg:flex lg:flex-col lg:justify-between xl:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(135,158,131,.18),transparent_35%)]" />
        <div className="relative">
          <Link to="/" className="inline-flex rounded-2xl bg-[#879E83] p-2" aria-label="Royalties Service Connect home"><img src={logoUrl} alt="Royalties Service Connect" className="h-14 w-auto object-contain" /></Link>
          <div className="mt-12 inline-flex items-center gap-2 rounded-full border border-[#D9B24C]/20 bg-[#D9B24C]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#E2C46C]"><ShieldCheck size={14} /> Restricted access</div>
          <h1 className="mt-6 max-w-lg text-5xl font-semibold leading-[1.05] tracking-[-0.055em] text-white">Platform operations, behind one secure door.</h1>
          <p className="mt-6 max-w-lg text-sm leading-7 text-slate-400">Administrative access is isolated from candidate and recruiter authentication and restricted to authorized platform operators.</p>
        </div>
        <div className="relative grid gap-3 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[.04] p-5"><Fingerprint className="text-[#D9B24C]" size={22} /><p className="mt-4 text-sm font-semibold text-white">Role protected</p><p className="mt-1 text-xs leading-5 text-slate-500">Non-admin sessions are rejected from this portal.</p></div>
          <div className="rounded-3xl border border-white/10 bg-white/[.04] p-5"><LockKeyhole className="text-[#D9B24C]" size={22} /><p className="mt-4 text-sm font-semibold text-white">Dedicated workspace</p><p className="mt-1 text-xs leading-5 text-slate-500">Moderation and operational controls stay separated.</p></div>
        </div>
      </section>

      <section className="flex items-center justify-center p-6 sm:p-10 xl:p-14">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D9B24C]">Admin portal</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl">Secure sign in</h2><p className="mt-3 text-sm leading-6 text-slate-400">Authenticate with an authorized administrator account.</p></div>
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/5 text-[#D9B24C]"><Fingerprint size={23} /></span>
          </div>
          {error && <div role="alert" className="mb-5 rounded-2xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <AdminField label="Admin email" error={errors.email} icon={Mail}><input value={form.email} onChange={updateField('email')} onBlur={validate} maxLength="254" type="email" autoComplete="username" className="min-w-0 flex-1 bg-transparent px-3 py-3.5 text-sm text-white outline-none placeholder:text-slate-600" placeholder="admin@example.com" /></AdminField>
            <div><span className="mb-2 block text-sm font-semibold text-slate-300">Password</span><div className={`flex items-center rounded-2xl border bg-white/[.035] transition focus-within:bg-white/[.055] focus-within:ring-4 ${errors.password ? 'border-red-400/50 focus-within:ring-red-500/10' : 'border-white/10 focus-within:border-[#D9B24C]/50 focus-within:ring-[#D9B24C]/10'}`}><LockKeyhole size={18} className="ml-4 shrink-0 text-slate-500" /><input value={form.password} onChange={updateField('password')} onBlur={validate} maxLength="128" type={showPassword ? 'text' : 'password'} autoComplete="current-password" className="min-w-0 flex-1 bg-transparent px-3 py-3.5 text-sm text-white outline-none placeholder:text-slate-600" placeholder="Enter admin password" /><button type="button" onClick={() => setShowPassword((current) => !current)} className="mr-2 grid size-9 place-items-center rounded-xl text-slate-500 transition hover:bg-white/5 hover:text-slate-200" aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>{errors.password && <p className="mt-1.5 text-xs font-medium text-red-300">{errors.password}</p>}</div>
            <button disabled={submitting} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D9B24C] px-4 py-4 text-sm font-bold text-slate-950 shadow-lg shadow-black/20 transition hover:bg-[#E2C46C] disabled:cursor-not-allowed disabled:opacity-60"><ShieldCheck size={17} />{submitting ? 'Authenticating…' : 'Enter administration'}</button>
          </form>
          <div className="mt-7 border-t border-white/10 pt-6"><Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-white"><ArrowLeft size={16} />Return to public website</Link></div>
        </div>
      </section>
    </div>
  </main>;
}

function AdminField({ label, error = '', icon: Icon, children }) {
  return <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-300">{label}</span><span className={`flex items-center rounded-2xl border bg-white/[.035] transition focus-within:bg-white/[.055] focus-within:ring-4 ${error ? 'border-red-400/50 focus-within:ring-red-500/10' : 'border-white/10 focus-within:border-[#D9B24C]/50 focus-within:ring-[#D9B24C]/10'}`}><Icon size={18} className="ml-4 shrink-0 text-slate-500" />{children}</span>{error && <span className="mt-1.5 block text-xs font-medium text-red-300">{error}</span>}</label>;
}
