import { ArrowRight, BadgeCheck, Building2, Search, ShieldCheck, Sparkles, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [['10k+', 'Candidate profiles'], ['1.2k+', 'Hiring companies'], ['6.5k+', 'Open opportunities'], ['92%', 'Hiring satisfaction']];
const benefits = [
  [Sparkles, 'Smarter discovery', 'Find relevant roles through focused search, clear filters, and role-based recommendations.'],
  [BadgeCheck, 'Trusted employers', 'Company verification and moderation help keep opportunity quality high.'],
  [ShieldCheck, 'Private by design', 'Candidate data and recruiter workflows are protected with role-aware access controls.'],
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,.24),transparent_34%),radial-gradient(circle_at_85%_20%,rgba(14,165,233,.16),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-28">
          <div className="self-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300"><Sparkles size={14} className="text-indigo-300" /> Opportunities built around people</div>
            <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.045em] sm:text-6xl lg:text-7xl">The right career move should feel <span className="text-indigo-300">connected.</span></h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">Discover quality jobs, track every application, and connect with employers through one focused recruitment experience.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link to="/jobs" className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400">Explore jobs <ArrowRight size={17} /></Link><Link to="/register?role=recruiter" className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">Hire talent</Link></div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-6">
            <div className="rounded-[1.5rem] bg-white p-5 text-slate-950 sm:p-6">
              <div className="mb-5"><p className="text-xs font-semibold uppercase tracking-[.18em] text-indigo-600">Search opportunities</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">Find work that fits.</h2></div>
              <div className="grid gap-3"><div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-500"><Search size={18} /> Job title, skill, or keyword</div><div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-500"><Building2 size={18} /> City, state, or remote</div><Link to="/jobs" className="rounded-xl bg-slate-950 px-4 py-3 text-center text-sm font-semibold text-white">Search jobs</Link></div>
              <div className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-xl bg-slate-50 p-4"><UsersRound className="mb-3 text-indigo-600" size={20} /><strong className="block text-sm">Candidate-first</strong><span className="mt-1 block text-xs leading-5 text-slate-500">Simple applications and transparent tracking.</span></div><div className="rounded-xl bg-indigo-50 p-4"><BadgeCheck className="mb-3 text-indigo-600" size={20} /><strong className="block text-sm">Verified hiring</strong><span className="mt-1 block text-xs leading-5 text-slate-500">Quality-focused employer workflows.</span></div></div>
            </div>
          </div>
        </div>
      </section>
      <section className="border-b border-slate-200 bg-white"><div className="mx-auto grid max-w-7xl grid-cols-2 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">{stats.map(([value,label]) => <div key={label} className="border-slate-200 px-3 py-4 text-center lg:border-r lg:last:border-r-0"><strong className="block text-2xl font-semibold tracking-tight">{value}</strong><span className="mt-1 block text-xs text-slate-500">{label}</span></div>)}</div></section>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"><div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[.18em] text-indigo-600">Why RB Service Connect</p><h2 className="mt-3 text-4xl font-semibold tracking-[-0.035em]">Recruitment without the noise.</h2><p className="mt-4 leading-7 text-slate-600">A focused experience for candidates, recruiters, and administrators—designed around clear actions instead of clutter.</p></div><div className="mt-10 grid gap-5 md:grid-cols-3">{benefits.map(([Icon,title,copy]) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><span className="mb-5 grid size-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600"><Icon size={21} /></span><h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{copy}</p></article>)}</div></section>
    </>
  );
}
