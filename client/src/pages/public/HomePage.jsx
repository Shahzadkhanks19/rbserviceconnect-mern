import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Code2,
  Headphones,
  HeartHandshake,
  Landmark,
  MapPin,
  Megaphone,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  TrendingUp,
  UserRoundCheck,
  UsersRound,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { icon: Code2, title: 'Technology', jobs: 'Engineering, product & data' },
  { icon: CircleDollarSign, title: 'Finance', jobs: 'Accounting, banking & fintech' },
  { icon: Megaphone, title: 'Marketing', jobs: 'Growth, content & brand' },
  { icon: Stethoscope, title: 'Healthcare', jobs: 'Clinical, operations & support' },
  { icon: Landmark, title: 'Operations', jobs: 'Admin, logistics & management' },
  { icon: Headphones, title: 'Customer Success', jobs: 'Support, service & retention' },
];

const featuredJobs = [
  {
    title: 'Senior Frontend Developer',
    company: 'Northstar Digital',
    location: 'Bengaluru · Hybrid',
    type: 'Full-time',
    experience: '4–7 years',
    salary: '₹18L – ₹26L',
    initials: 'ND',
  },
  {
    title: 'Product Designer',
    company: 'Aster Labs',
    location: 'Remote · India',
    type: 'Full-time',
    experience: '3–5 years',
    salary: '₹14L – ₹20L',
    initials: 'AL',
  },
  {
    title: 'Growth Marketing Manager',
    company: 'Verde Commerce',
    location: 'Gurugram · On-site',
    type: 'Full-time',
    experience: '5–8 years',
    salary: '₹16L – ₹24L',
    initials: 'VC',
  },
];

const candidateSteps = [
  ['01', 'Build your profile', 'Create one professional profile with skills, experience, preferences, and your resume.'],
  ['02', 'Discover relevant roles', 'Use focused search and clear filters to find opportunities that actually match your goals.'],
  ['03', 'Track every application', 'Follow progress from application to interview without losing context across multiple jobs.'],
];

const recruiterFeatures = [
  [Target, 'Structured hiring pipeline', 'Move applicants through review, shortlist, interview, offer, and final decisions from one workspace.'],
  [UsersRound, 'Candidate discovery', 'Review relevant candidate profiles with the information recruiters need to make faster decisions.'],
  [BarChart3, 'Hiring visibility', 'Understand job performance, applicant volume, and pipeline progress without manual reporting.'],
];

const platformStats = [
  ['3', 'Dedicated user workspaces'],
  ['1', 'Unified hiring pipeline'],
  ['24/7', 'Candidate access'],
  ['100%', 'Responsive experience'],
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: 'easeOut' },
};

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(99,102,241,0.28),transparent_30%),radial-gradient(circle_at_85%_18%,rgba(14,165,233,0.18),transparent_28%),linear-gradient(to_bottom,transparent,rgba(15,23,42,0.4))]" />
        <div className="absolute left-1/2 top-0 h-px w-[90%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-4 pb-20 pt-16 sm:px-6 sm:pt-20 lg:grid-cols-[1.08fr_.92fr] lg:px-8 lg:pb-28 lg:pt-24">
          <motion.div {...fadeUp} className="self-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-300 shadow-sm backdrop-blur">
              <Sparkles size={14} className="text-indigo-300" />
              One platform for candidates, recruiters, and hiring teams
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.055em] sm:text-6xl lg:text-[4.6rem] lg:leading-[1.02]">
              Great careers start with the <span className="text-indigo-300">right connection.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Discover better opportunities, manage applications with clarity, and help companies hire confidently through one modern recruitment experience.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:bg-indigo-400"
              >
                Explore opportunities <ArrowRight size={17} />
              </Link>
              <Link
                to="/register?role=recruiter"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Hire great talent <UsersRound size={17} />
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-slate-400">
              <span className="inline-flex items-center gap-2"><Check size={15} className="text-emerald-400" /> Candidate-first experience</span>
              <span className="inline-flex items-center gap-2"><Check size={15} className="text-emerald-400" /> Recruiter verification</span>
              <span className="inline-flex items-center gap-2"><Check size={15} className="text-emerald-400" /> Clear application tracking</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="relative"
          >
            <div className="absolute -inset-5 rounded-[2.5rem] bg-indigo-500/10 blur-3xl" />
            <div className="relative rounded-[2rem] border border-white/10 bg-white/7 p-3 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-5">
              <div className="rounded-[1.6rem] bg-white p-5 text-slate-950 shadow-xl sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Job discovery</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">Find work that fits you.</h2>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-indigo-50 text-indigo-600">
                    <Search size={20} />
                  </span>
                </div>

                <div className="mt-6 grid gap-3">
                  <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm text-slate-500 transition focus-within:border-indigo-300 focus-within:bg-white">
                    <Search size={18} className="shrink-0 text-slate-400" />
                    <input
                      type="search"
                      aria-label="Search by job title or skill"
                      placeholder="Job title, skill, or keyword"
                      className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                    />
                  </label>
                  <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm text-slate-500 transition focus-within:border-indigo-300 focus-within:bg-white">
                    <MapPin size={18} className="shrink-0 text-slate-400" />
                    <input
                      type="search"
                      aria-label="Search by location"
                      placeholder="City, state, or remote"
                      className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                    />
                  </label>
                  <Link to="/jobs" className="rounded-xl bg-slate-950 px-4 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-slate-800">
                    Search opportunities
                  </Link>
                </div>

                <div className="mt-6 border-t border-slate-200 pt-5">
                  <p className="text-xs font-semibold text-slate-500">Popular searches</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['React', 'UI/UX', 'Marketing', 'Remote', 'Finance'].map((item) => (
                      <Link key={item} to="/jobs" className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-700">
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-3 p-2 pt-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-xl bg-emerald-400/15 text-emerald-300"><UserRoundCheck size={18} /></span>
                    <div><strong className="block text-sm">Candidate workspace</strong><span className="text-xs text-slate-400">Everything in one place</span></div>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-xl bg-indigo-400/15 text-indigo-300"><BadgeCheck size={18} /></span>
                    <div><strong className="block text-sm">Trusted hiring</strong><span className="text-xs text-slate-400">Moderated employers</span></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
          {platformStats.map(([value, label]) => (
            <div key={label} className="px-3 py-4 text-center lg:border-r lg:border-slate-200 lg:last:border-r-0">
              <strong className="block text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl">{value}</strong>
              <span className="mt-1.5 block text-xs font-medium text-slate-500">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Explore by profession</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">Start where your strengths are.</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">Browse opportunities by the work you want to do, then refine by location, experience, and employment type.</p>
            </div>
            <Link to="/jobs" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-500">
              Browse all jobs <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map(({ icon: Icon, title, jobs }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
              >
                <Link to="/jobs" className="group flex h-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-slate-950/5">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                    <Icon size={21} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <strong className="block text-base font-semibold text-slate-950">{title}</strong>
                    <span className="mt-1 block text-xs leading-5 text-slate-500">{jobs}</span>
                  </span>
                  <ChevronRight size={18} className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-500" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Featured opportunities</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">Roles worth exploring.</h2>
              <p className="mt-4 leading-7 text-slate-600">A cleaner job card gives candidates the context they need before deciding where to spend their time.</p>
            </div>
            <Link to="/jobs" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-500">View all jobs <ArrowRight size={16} /></Link>
          </motion.div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featuredJobs.map((job, index) => (
              <motion.article
                key={job.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-slate-950/5"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-12 place-items-center rounded-2xl bg-slate-950 text-sm font-bold text-white">{job.initials}</span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700">Actively hiring</span>
                </div>
                <div className="mt-6">
                  <p className="text-xs font-semibold text-slate-500">{job.company}</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-slate-950">{job.title}</h3>
                </div>
                <div className="mt-5 space-y-2.5 text-sm text-slate-500">
                  <span className="flex items-center gap-2"><MapPin size={15} /> {job.location}</span>
                  <span className="flex items-center gap-2"><BriefcaseBusiness size={15} /> {job.experience} · {job.type}</span>
                  <span className="flex items-center gap-2"><CircleDollarSign size={15} /> {job.salary}</span>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5">
                  <span className="flex items-center gap-2 text-xs text-slate-400"><Clock3 size={14} /> Recently posted</span>
                  <Link to="/jobs" className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 transition group-hover:gap-2.5">View role <ArrowRight size={15} /></Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-8">
          <motion.div {...fadeUp}>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-300">Built for candidates</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Your job search deserves a workspace, not a spreadsheet.</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">RB Service Connect keeps your profile, saved roles, applications, interview progress, and next steps together so you always know where things stand.</p>
            <Link to="/register" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">Create candidate profile <ArrowRight size={16} /></Link>
          </motion.div>

          <div className="grid gap-4">
            {candidateSteps.map(([number, title, copy], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur sm:grid-cols-[auto_1fr] sm:p-6"
              >
                <span className="grid size-11 place-items-center rounded-xl border border-indigo-300/20 bg-indigo-400/10 text-xs font-bold text-indigo-300">{number}</span>
                <div><h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{copy}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center">
            <motion.div {...fadeUp} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/5 sm:p-7">
              <div className="rounded-2xl bg-slate-950 p-5 text-white sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div><p className="text-xs font-semibold text-indigo-300">Recruiter workspace</p><h3 className="mt-1 text-xl font-semibold">Senior Product Designer</h3></div>
                  <span className="rounded-lg bg-white/10 px-3 py-1.5 text-xs text-slate-300">42 applicants</span>
                </div>
                <div className="mt-6 grid grid-cols-4 gap-2 text-center text-[11px] font-semibold text-slate-400">
                  {['New', 'Review', 'Interview', 'Offer'].map((stage, index) => <span key={stage} className={`rounded-lg px-2 py-2 ${index === 2 ? 'bg-indigo-500 text-white' : 'bg-white/5'}`}>{stage}</span>)}
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {[
                  ['AK', 'Ananya Kapoor', 'Product design · 5 yrs', 'Interview'],
                  ['RM', 'Rohan Mehta', 'UX systems · 4 yrs', 'Review'],
                  ['SN', 'Sara Nair', 'Research & UX · 6 yrs', 'Shortlisted'],
                ].map(([initials, name, profile, status]) => (
                  <div key={name} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3.5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-indigo-50 text-xs font-bold text-indigo-700">{initials}</span>
                    <span className="min-w-0 flex-1"><strong className="block truncate text-sm text-slate-950">{name}</strong><span className="block truncate text-xs text-slate-500">{profile}</span></span>
                    <span className="hidden rounded-lg bg-slate-100 px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 sm:block">{status}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp}>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">For recruiters</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">Make every hiring decision easier to see.</h2>
              <p className="mt-5 max-w-xl leading-8 text-slate-600">Post roles, review applicants, manage interviews, and understand pipeline health from one recruiter-focused dashboard.</p>
              <div className="mt-8 space-y-5">
                {recruiterFeatures.map(([Icon, title, copy]) => (
                  <div key={title} className="flex gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-600"><Icon size={19} /></span>
                    <div><h3 className="font-semibold text-slate-950">{title}</h3><p className="mt-1.5 text-sm leading-6 text-slate-500">{copy}</p></div>
                  </div>
                ))}
              </div>
              <Link to="/register?role=recruiter" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Start hiring <ArrowRight size={16} /></Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-6 sm:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_.9fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/70 px-3 py-1.5 text-xs font-bold text-indigo-700"><ShieldCheck size={14} /> Trust is part of the product</span>
                <h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">A hiring platform should feel professional on both sides.</h2>
                <p className="mt-5 max-w-2xl leading-8 text-slate-600">Role-aware access, recruiter moderation, structured application states, and clear account boundaries are built into the platform architecture instead of added as an afterthought.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  [BadgeCheck, 'Recruiter verification', 'Employer access can be reviewed before hiring tools are enabled.'],
                  [ShieldCheck, 'Role-based access', 'Candidate, recruiter, and admin functionality stays separated.'],
                  [TrendingUp, 'Clear workflows', 'Application status changes follow a structured hiring lifecycle.'],
                  [HeartHandshake, 'Human-focused UX', 'Interfaces prioritize clarity and next actions over dashboard clutter.'],
                ].map(([Icon, title, copy]) => (
                  <div key={title} className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm backdrop-blur">
                    <Icon size={19} className="text-indigo-600" />
                    <h3 className="mt-3 text-sm font-semibold text-slate-950">{title}</h3>
                    <p className="mt-1.5 text-xs leading-5 text-slate-500">{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-300">Your next step</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">Find the opportunity. Or find the person who can fill it.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300">RB Service Connect gives candidates and employers a focused place to move forward.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/register" className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-400">Create candidate account <ArrowRight size={16} /></Link>
              <Link to="/register?role=recruiter" className="rounded-xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">Create recruiter account</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
