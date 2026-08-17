import { BriefcaseBusiness, CheckCircle2, Eye, EyeOff, UserRound } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { apiRequest } from '../../lib/api.js';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'recruiter' ? 'recruiter' : 'candidate';
  const [role, setRole] = useState(initialRole);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const passwordChecks = useMemo(() => ({
    length: form.password.length >= 8,
    letter: /[A-Za-z]/.test(form.password),
    number: /\d/.test(form.password),
  }), [form.password]);

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.password) {
      setError('Complete all required fields.');
      return;
    }
    if (!passwordChecks.length) {
      setError('Your password must be at least 8 characters.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setSubmitting(true);
      const response = await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          password: form.password,
          role,
        }),
      });

      if (role === 'recruiter') {
        setSuccess(response?.message || 'Recruiter account created and awaiting approval.');
      } else {
        navigate('/login', { replace: true });
      }
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-slate-50 py-10 sm:py-14">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[.82fr_1.18fr] lg:px-8">
        <aside className="rounded-[2rem] bg-[#F3E8A2]/70 p-7 sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-700">Join Royalties Service Connect</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950">One account. The right workspace.</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">Choose how you use the platform and we’ll set up the right experience from the start.</p>
          <div className="mt-8 space-y-3">
            {(role === 'candidate' ? ['Build a professional candidate profile', 'Apply to verified opportunities', 'Track applications and interview progress'] : ['Build your employer presence', 'Post and manage job openings', 'Review candidates through a structured pipeline']).map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl bg-white/70 p-4 text-sm font-medium text-slate-700"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-indigo-600" /> {item}</div>
            ))}
          </div>
        </aside>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-black/5 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-700">Create account</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">Start with the right role.</h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={() => setRole('candidate')} className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${role === 'candidate' ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100' : 'border-slate-200 hover:border-slate-300'}`}>
              <span className="grid size-10 place-items-center rounded-xl bg-white text-indigo-600"><UserRound size={19} /></span>
              <span><strong className="block text-sm text-slate-950">I’m a candidate</strong><span className="mt-1 block text-xs text-slate-500">Find and manage opportunities</span></span>
            </button>
            <button type="button" onClick={() => setRole('recruiter')} className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${role === 'recruiter' ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100' : 'border-slate-200 hover:border-slate-300'}`}>
              <span className="grid size-10 place-items-center rounded-xl bg-white text-indigo-600"><BriefcaseBusiness size={19} /></span>
              <span><strong className="block text-sm text-slate-950">I’m an employer</strong><span className="mt-1 block text-xs text-slate-500">Hire and manage candidates</span></span>
            </button>
          </div>

          {role === 'recruiter' && <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-800">Employer accounts are reviewed before recruiter tools are activated.</div>}
          {error && <div role="alert" className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
          {success && <div role="status" className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-800">{success} <Link to="/login" className="font-bold underline">Return to sign in</Link>.</div>}

          {!success && (
            <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="First name"><input value={form.firstName} onChange={updateField('firstName')} autoComplete="given-name" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100" placeholder="First name" /></Field>
                <Field label="Last name"><input value={form.lastName} onChange={updateField('lastName')} autoComplete="family-name" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100" placeholder="Last name" /></Field>
              </div>
              <Field label="Email address"><input value={form.email} onChange={updateField('email')} type="email" autoComplete="email" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100" placeholder="you@example.com" /></Field>
              <Field label="Create password">
                <div className="flex items-center rounded-xl border border-slate-200 pr-3 transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100">
                  <input value={form.password} onChange={updateField('password')} type={showPassword ? 'text' : 'password'} autoComplete="new-password" className="min-w-0 flex-1 rounded-xl bg-transparent px-4 py-3 text-sm outline-none" placeholder="At least 8 characters" />
                  <button type="button" onClick={() => setShowPassword((current) => !current)} className="text-slate-400 hover:text-slate-700" aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                  <PasswordCheck passed={passwordChecks.length}>8+ characters</PasswordCheck>
                  <PasswordCheck passed={passwordChecks.letter}>Letter</PasswordCheck>
                  <PasswordCheck passed={passwordChecks.number}>Number</PasswordCheck>
                </div>
              </Field>
              <Field label="Confirm password"><input value={form.confirmPassword} onChange={updateField('confirmPassword')} type="password" autoComplete="new-password" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100" placeholder="Repeat password" /></Field>
              <button disabled={submitting} className="mt-1 rounded-xl bg-indigo-500 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-900/10 transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60">{submitting ? 'Creating account…' : role === 'recruiter' ? 'Create employer account' : 'Create candidate account'}</button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-slate-500">Already registered? <Link to="/login" className="font-semibold text-indigo-700 hover:text-indigo-600">Sign in</Link></p>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>{children}</label>;
}

function PasswordCheck({ passed, children }) {
  return <span className={`rounded-full px-2.5 py-1 font-semibold ${passed ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>{children}</span>;
}
