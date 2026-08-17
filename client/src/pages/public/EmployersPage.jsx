import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardList,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
  UserRoundSearch,
  UsersRound,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: BriefcaseBusiness,
    title: 'Publish structured roles',
    copy: 'Create clear job posts with responsibilities, requirements, compensation, workplace type, and skills in one consistent format.',
  },
  {
    icon: UserRoundSearch,
    title: 'Review relevant candidates',
    copy: 'See the profile information needed to make screening decisions without switching between disconnected tools.',
  },
  {
    icon: ClipboardList,
    title: 'Manage the hiring pipeline',
    copy: 'Move applicants through review, shortlist, interview, offer, hired, or rejected stages with a clear history of each decision.',
  },
  {
    icon: MessagesSquare,
    title: 'Keep candidate communication clear',
    copy: 'Give candidates better visibility into progress while recruiters keep interview notes and next steps organized.',
  },
  {
    icon: BarChart3,
    title: 'Understand hiring performance',
    copy: 'Track job activity, applicant volume, pipeline movement, and hiring progress from the recruiter workspace.',
  },
  {
    icon: ShieldCheck,
    title: 'Build trust through verification',
    copy: 'Recruiter verification and role moderation help create a more accountable hiring environment for both sides.',
  },
];

const steps = [
  ['01', 'Create your employer account', 'Register as a recruiter and complete your organization profile.'],
  ['02', 'Complete verification', 'Provide the business information required for employer review before publishing roles.'],
  ['03', 'Publish and manage jobs', 'Create openings, receive applications, and keep every candidate moving through a structured pipeline.'],
  ['04', 'Make better hiring decisions', 'Use applicant context, interview progress, and pipeline visibility to close roles with confidence.'],
];

const recruiterStats = [
  ['1', 'Recruiter workspace'],
  ['6', 'Structured pipeline stages'],
  ['24/7', 'Hiring access'],
  ['100%', 'Role-aware workflows'],
];

export default function EmployersPage() {
  return (
    <>
      <section className="overflow-hidden bg-[#879E83] text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.02fr_.98fr] lg:px-8 lg:py-20">
          <div className="self-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white/90">
              <Sparkles size={14} /> Built for modern hiring teams
            </div>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-[-0.055em] sm:text-6xl lg:text-[4.4rem] lg:leading-[1.02]">
              Hire with more clarity, less admin.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              RB Service Connect gives recruiters one focused place to publish roles, review applicants, manage interviews, and understand exactly where every hire stands.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register?role=recruiter" className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:bg-indigo-600">
                Create recruiter account <ArrowRight size={17} />
              </Link>
              <Link to="/login" className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/15">
                Recruiter sign in
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-white/75">
              <span className="inline-flex items-center gap-2"><CheckCircle2 size={15} /> Verified employer profiles</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 size={15} /> Structured applications</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 size={15} /> Candidate tracking</span>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/20 bg-white p-5 text-slate-950 shadow-2xl shadow-black/10 sm:p-6">
            <div className="rounded-2xl bg-slate-950 p-5 text-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-300">Recruiter workspace</p>
                  <h2 className="mt-2 text-2xl font-semibold">Senior Product Designer</h2>
                </div>
                <span className="rounded-lg bg-white/10 px-3 py-2 text-xs">42 applicants</span>
              </div>
              <div className="mt-6 grid grid-cols-4 gap-2 text-center text-[11px] font-semibold">
                <span className="rounded-lg bg-white/10 px-2 py-2.5">New</span>
                <span className="rounded-lg bg-white/10 px-2 py-2.5">Review</span>
                <span className="rounded-lg bg-indigo-500 px-2 py-2.5">Interview</span>
                <span className="rounded-lg bg-white/10 px-2 py-2.5">Offer</span>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {[
                ['AK', 'Ananya Kapoor', 'Product design · 5 yrs', 'Interview'],
                ['RM', 'Rohan Mehta', 'UX systems · 4 yrs', 'Review'],
                ['SN', 'Sara Nair', 'Research & UX · 6 yrs', 'Shortlisted'],
              ].map(([initials, name, detail, status]) => (
                <div key={name} className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#F3E8A2] text-xs font-bold text-slate-800">{initials}</span>
                  <div className="min-w-0 flex-1">
                    <strong className="block truncate text-sm">{name}</strong>
                    <span className="block truncate text-xs text-slate-500">{detail}</span>
                  </div>
                  <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-[11px] font-semibold text-slate-600">{status}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-[#F3E8A2]/55 p-4">
                <BadgeCheck size={19} className="text-indigo-700" />
                <strong className="mt-3 block text-sm">Verified employer identity</strong>
                <p className="mt-1 text-xs leading-5 text-slate-600">Build candidate confidence before the first conversation.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <UsersRound size={19} className="text-emerald-700" />
                <strong className="mt-3 block text-sm">Candidate context</strong>
                <p className="mt-1 text-xs leading-5 text-slate-600">Keep profiles, stage, and next actions visible together.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 py-7 sm:px-6 lg:grid-cols-4 lg:px-8">
          {recruiterStats.map(([value, label]) => (
            <div key={label} className="px-3 py-3 text-center lg:border-r lg:border-slate-200 lg:last:border-r-0">
              <strong className="block text-2xl font-semibold text-slate-950 sm:text-3xl">{value}</strong>
              <span className="mt-1 block text-xs font-medium text-slate-500">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-700">Recruitment, organized</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">Everything your hiring workflow needs to stay visible.</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">Designed around the actual work recruiters do every day—not around dashboard clutter.</p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, copy }) => (
              <article key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="grid size-11 place-items-center rounded-2xl bg-[#F3E8A2]/70 text-indigo-700"><Icon size={20} /></span>
                <h3 className="mt-5 text-lg font-semibold text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[.78fr_1.22fr] lg:px-8">
          <div className="self-start lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-700">From account to hire</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950">A hiring flow your team can actually follow.</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">The employer experience is designed around clear stages so recruiters and candidates always know what happens next.</p>
            <Link to="/register?role=recruiter" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600">
              Start hiring <ArrowRight size={16} />
            </Link>
          </div>

          <div className="space-y-3">
            {steps.map(([number, title, copy]) => (
              <article key={number} className="flex gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#879E83] text-xs font-bold text-white">{number}</span>
                <div>
                  <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-600">{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F3E8A2]/60 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-white text-emerald-700 shadow-sm"><ShieldCheck size={24} /></div>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-indigo-700">A more accountable marketplace</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">Professional hiring starts with trust.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">Employer verification, role moderation, separated user permissions, and structured candidate states are built into the platform foundation.</p>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-300">Your next hire starts here</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Create your employer workspace.</h2>
            <p className="mt-4 text-base leading-7 text-slate-300">Set up your recruiter account, establish your company profile, and start building a hiring pipeline that stays organized.</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link to="/register?role=recruiter" className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-600">Create recruiter account <ArrowRight size={16} /></Link>
            <Link to="/login" className="rounded-xl border border-white/15 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">Recruiter sign in</Link>
          </div>
        </div>
      </section>
    </>
  );
}
