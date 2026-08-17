import { BadgeCheck, BriefcaseBusiness, ShieldCheck, UsersRound } from 'lucide-react';

const pillars = [
  [UsersRound, 'Candidate clarity', 'Make discovery, applications, and progress tracking easier to understand.'],
  [BriefcaseBusiness, 'Recruiter focus', 'Give hiring teams a structured workspace instead of scattered tools and spreadsheets.'],
  [BadgeCheck, 'Quality first', 'Support better employer moderation and more trustworthy opportunity discovery.'],
  [ShieldCheck, 'Responsible access', 'Keep candidate, recruiter, and admin experiences separated through role-aware controls.'],
];

export default function AboutPage() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">About RB Service Connect</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-6xl">Recruitment built around clearer decisions.</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">RB Service Connect is designed as a complete recruitment platform where candidates can discover and track opportunities, recruiters can manage hiring pipelines, and administrators can oversee platform quality from one connected system.</p>
          </div>
          <div className="rounded-[2rem] bg-slate-950 p-6 text-white sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-300">Platform vision</p>
            <blockquote className="mt-4 text-2xl font-semibold leading-snug tracking-[-0.03em]">Less friction between good people and good opportunities.</blockquote>
            <p className="mt-5 text-sm leading-7 text-slate-400">The product focuses on useful workflows, transparent status, and role-specific experiences rather than unnecessary dashboard complexity.</p>
          </div>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map(([Icon, title, copy]) => (
            <article key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <span className="grid size-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600"><Icon size={20} /></span>
              <h2 className="mt-5 font-semibold text-slate-950">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
