import { ArrowRight, BadgeCheck, BriefcaseBusiness, CheckCircle2, ShieldCheck, Sparkles, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';

const pillars = [
  [UsersRound, 'Candidate clarity', 'Make discovery, applications, and progress tracking easier to understand.'],
  [BriefcaseBusiness, 'Recruiter focus', 'Give hiring teams a structured workspace instead of scattered tools and spreadsheets.'],
  [BadgeCheck, 'Quality first', 'Support better employer moderation and more trustworthy opportunity discovery.'],
  [ShieldCheck, 'Responsible access', 'Keep candidate, recruiter, and admin experiences separated through role-aware controls.'],
];

const principles = [
  'Useful information before unnecessary complexity',
  'Clear status and ownership across every workflow',
  'Separate experiences for candidates, recruiters, and administrators',
  'Trust, moderation, and accountability built into hiring activity',
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-black/5 bg-[#F3E8A2]/55">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8 lg:py-18">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-700">About Royalties Service Connect</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-5xl lg:text-6xl">Recruitment built around clearer decisions.</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">Royalties Service Connect brings job discovery, employer hiring workflows, and platform oversight into one connected recruitment experience without making any role more complicated than it needs to be.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/jobs" className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400">Explore jobs <ArrowRight size={16} /></Link>
              <Link to="/employers" className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-white px-5 py-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50">For employers</Link>
            </div>
          </div>

          <div className="rounded-[2rem] bg-slate-950 p-7 text-white shadow-2xl shadow-black/10 sm:p-9">
            <span className="grid size-12 place-items-center rounded-2xl bg-[#879E83] text-white"><Sparkles size={21} /></span>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-[#F3E8A2]">Our direction</p>
            <blockquote className="mt-4 text-2xl font-semibold leading-snug tracking-[-0.035em] sm:text-3xl">Less friction between good people and good opportunities.</blockquote>
            <p className="mt-5 text-sm leading-7 text-slate-400">The platform is designed around transparent status, role-specific tools, verified participation, and a hiring experience people can actually follow.</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-700">What we are building for</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-4xl">A better experience on every side of hiring.</h2>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map(([Icon, title, copy]) => (
              <article key={title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-black/5">
                <span className="grid size-11 place-items-center rounded-xl bg-[#879E83] text-white"><Icon size={20} /></span>
                <h3 className="mt-5 font-semibold text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14 sm:py-18">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:items-start lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-700">How we think about the product</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-4xl">Simple where it should be. Structured where it matters.</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600">A recruitment platform has to serve very different users. Candidates need clarity, recruiters need control, and administrators need oversight. The product architecture keeps those responsibilities separate while connecting the information each workflow depends on.</p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="space-y-4">
              {principles.map((principle) => (
                <div key={principle} className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-medium leading-6 text-slate-700">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-indigo-600" />
                  <span>{principle}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-[#879E83] p-7 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-9">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">Choose your path</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">Find work or build your hiring pipeline.</h2>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-0">
              <Link to="/register" className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white">Create candidate account</Link>
              <Link to="/register?role=recruiter" className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950">Create employer account</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
