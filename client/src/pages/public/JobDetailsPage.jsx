import { ArrowLeft, BriefcaseBusiness, Building2, CheckCircle2, Clock3, MapPin, Share2, ShieldCheck, WalletCards } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getJobBySlug, jobs } from '../../data/jobs.js';

export default function JobDetailsPage() {
  const { slug } = useParams();
  const job = getJobBySlug(slug);

  if (!job) {
    return <section className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8"><h1 className="text-3xl font-semibold tracking-tight text-slate-950">This job is no longer available.</h1><p className="mt-3 text-slate-500">Browse current opportunities to find another role that fits.</p><Link to="/jobs" className="mt-6 inline-flex rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white">Browse jobs</Link></section>;
  }

  const relatedJobs = jobs.filter((item) => item.slug !== job.slug && (item.category === job.category || item.workplace === job.workplace)).slice(0, 3);
  const companySlug = job.company.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return (
    <>
      <section className="border-b border-slate-200 bg-[#F3E8A2]/55">
        <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:px-8 lg:py-11">
          <Link to="/jobs" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-indigo-700"><ArrowLeft size={16} /> Back to jobs</Link>
          <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-start">
              <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-[#879E83] text-lg font-bold text-white shadow-sm">{job.initials}</div>
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold"><span className="text-slate-600">{job.company}</span>{job.verified && <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700"><ShieldCheck size={13} /> Verified employer</span>}{job.featured && <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-indigo-700">Featured role</span>}</div>
                <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">{job.title}</h1>
                <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">{job.summary}</p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-slate-600"><span className="inline-flex items-center gap-1.5"><MapPin size={16} /> {job.location} · {job.workplace}</span><span className="inline-flex items-center gap-1.5"><BriefcaseBusiness size={16} /> {job.experience} · {job.type}</span><span className="inline-flex items-center gap-1.5"><WalletCards size={16} /> {job.salary}</span><span className="inline-flex items-center gap-1.5"><Clock3 size={16} /> Posted {job.posted}</span></div>
              </div>
            </div>
            <button type="button" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"><Share2 size={16} /> Share role</button>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-8 sm:py-10">
        <div className="mx-auto grid max-w-7xl gap-7 px-4 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8 xl:grid-cols-[1fr_370px]">
          <main className="space-y-5">
            <ContentCard title="About the role"><div className="space-y-4 text-sm leading-7 text-slate-600 sm:text-base">{job.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></ContentCard>
            <ContentCard title="What you'll do"><BulletList items={job.responsibilities} /></ContentCard>
            <ContentCard title="What we're looking for"><BulletList items={job.requirements} /></ContentCard>
            <ContentCard title="Skills that matter"><div className="flex flex-wrap gap-2.5">{job.skills.map((skill) => <span key={skill} className="rounded-xl bg-[#F3E8A2]/70 px-3 py-2 text-sm font-semibold text-slate-700">{skill}</span>)}</div></ContentCard>
            <ContentCard title="Benefits & support"><div className="grid gap-3 sm:grid-cols-2">{job.benefits.map((benefit) => <div key={benefit} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700"><CheckCircle2 size={18} className="shrink-0 text-indigo-600" /> {benefit}</div>)}</div></ContentCard>
            <ContentCard title="About the employer"><div className="flex items-start gap-4"><div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#879E83] text-sm font-bold text-white">{job.initials}</div><div><h3 className="text-lg font-semibold text-slate-950">{job.company}</h3><p className="mt-2 text-sm leading-6 text-slate-600">View the employer profile to understand the company, work style, benefits, and other active roles before applying.</p><Link to={`/companies/${companySlug}`} className="mt-4 inline-flex text-sm font-semibold text-indigo-700 hover:text-indigo-600">View company profile</Link></div></div></ContentCard>
          </main>

          <aside className="self-start lg:sticky lg:top-24">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-black/5"><p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-700">Ready to apply?</p><h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-slate-950">Put your profile forward.</h2><p className="mt-3 text-sm leading-6 text-slate-600">Sign in or create a candidate profile to apply and track your progress from one workspace.</p><Link to="/register" className="mt-6 block rounded-xl bg-indigo-500 px-4 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-indigo-900/10 transition hover:bg-indigo-400">Apply for this job</Link><Link to="/login" className="mt-2 block rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Already have an account? Sign in</Link><div className="mt-6 space-y-4 border-t border-slate-200 pt-6 text-sm text-slate-600"><DetailRow icon={Building2} label="Category" value={job.category} /><DetailRow icon={MapPin} label="Workplace" value={job.workplace} /><DetailRow icon={BriefcaseBusiness} label="Employment" value={job.type} /><DetailRow icon={WalletCards} label="Compensation" value={job.salary} /></div></div>
            <div className="mt-4 rounded-3xl bg-[#879E83] p-5 text-white"><div className="flex items-center gap-2 text-sm font-semibold"><ShieldCheck size={17} /> Safer job discovery</div><p className="mt-2 text-xs leading-5 text-white/80">Recruiter verification and role moderation help keep hiring activity accountable.</p></div>
          </aside>
        </div>
      </section>

      {relatedJobs.length > 0 && <section className="border-t border-slate-200 bg-white py-11 sm:py-12"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-700">Keep exploring</p><h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-950">Similar opportunities</h2></div><Link to="/jobs" className="text-sm font-semibold text-indigo-700">View all jobs</Link></div><div className="mt-6 grid gap-4 lg:grid-cols-3">{relatedJobs.map((item) => <Link key={item.slug} to={`/jobs/${item.slug}`} className="rounded-2xl border border-slate-200 p-5 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-black/5"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-[#879E83] text-xs font-bold text-white">{item.initials}</span><div><p className="text-xs font-semibold text-slate-500">{item.company}</p><h3 className="mt-1 font-semibold text-slate-950">{item.title}</h3></div></div><p className="mt-4 text-xs text-slate-500">{item.location} · {item.workplace}</p></Link>)}</div></div></section>}
    </>
  );
}

function ContentCard({ title, children }) { return <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"><h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">{title}</h2><div className="mt-5">{children}</div></section>; }
function BulletList({ items }) { return <div className="space-y-3">{items.map((item) => <div key={item} className="flex gap-3 text-sm leading-6 text-slate-600 sm:text-base"><CheckCircle2 size={18} className="mt-1 shrink-0 text-indigo-600" /><span>{item}</span></div>)}</div>; }
function DetailRow({ icon: Icon, label, value }) { return <div className="flex items-start gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-500"><Icon size={16} /></span><div><span className="block text-xs text-slate-400">{label}</span><strong className="mt-0.5 block text-sm font-semibold text-slate-700">{value}</strong></div></div>; }
