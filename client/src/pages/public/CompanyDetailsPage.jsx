import { ArrowLeft, ArrowRight, BriefcaseBusiness, Building2, CheckCircle2, MapPin, ShieldCheck, UsersRound } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getCompanyBySlug, getCompanyJobs } from '../../data/companies.js';

export default function CompanyDetailsPage() {
  const { slug } = useParams();
  const company = getCompanyBySlug(slug);

  if (!company) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Company profile not found.</h1>
        <p className="mt-3 text-slate-500">Explore verified employers currently available on RB Service Connect.</p>
        <Link to="/companies" className="mt-6 inline-flex rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white">Browse companies</Link>
      </section>
    );
  }

  const openJobs = getCompanyJobs(company.name);

  return (
    <>
      <section className="border-b border-slate-200 bg-[#F3E8A2]/55">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
          <Link to="/companies" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-indigo-700"><ArrowLeft size={16} /> Back to companies</Link>
          <div className="mt-7 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-start">
              <div className="grid size-20 shrink-0 place-items-center rounded-3xl bg-[#879E83] text-xl font-bold text-white shadow-sm">{company.initials}</div>
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold"><span className="text-indigo-700">{company.industry}</span>{company.verified && <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700"><ShieldCheck size={13} /> Verified employer</span>}</div>
                <h1 className="mt-2 text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">{company.name}</h1>
                <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">{company.summary}</p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-slate-600"><span className="inline-flex items-center gap-1.5"><MapPin size={16} /> {company.location}</span><span className="inline-flex items-center gap-1.5"><UsersRound size={16} /> {company.size}</span><span className="inline-flex items-center gap-1.5"><Building2 size={16} /> {company.workplace}</span></div>
              </div>
            </div>
            <Link to="#open-roles" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#E59D39] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10">View open roles <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-10 sm:py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8 xl:grid-cols-[1fr_350px]">
          <main className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-700">Company overview</p><h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">About {company.name}</h2><p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">{company.about}</p></section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">How the team works</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{company.values.map((value) => <div key={value} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700"><CheckCircle2 size={18} className="shrink-0 text-indigo-600" /> {value}</div>)}</div></section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">Benefits & support</h2><div className="mt-5 flex flex-wrap gap-2.5">{company.benefits.map((benefit) => <span key={benefit} className="rounded-xl bg-[#F3E8A2]/70 px-3 py-2 text-sm font-semibold text-slate-700">{benefit}</span>)}</div></section>
          </main>

          <aside className="self-start lg:sticky lg:top-24">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-black/5"><p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-700">Employer snapshot</p><div className="mt-5 space-y-5"><SnapshotRow icon={Building2} label="Industry" value={company.industry} /><SnapshotRow icon={MapPin} label="Primary location" value={company.location} /><SnapshotRow icon={UsersRound} label="Company size" value={company.size} /><SnapshotRow icon={BriefcaseBusiness} label="Open roles" value={`${openJobs.length}`} /></div></div>
            <div className="mt-4 rounded-3xl bg-[#879E83] p-5 text-white"><div className="flex items-center gap-2 text-sm font-semibold"><ShieldCheck size={17} /> Verified employer profile</div><p className="mt-2 text-xs leading-5 text-white/80">Recruiter verification and role moderation help candidates understand who they are applying to.</p></div>
          </aside>
        </div>
      </section>

      <section id="open-roles" className="border-t border-slate-200 bg-white py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-700">Open opportunities</p><h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-950">Jobs at {company.name}</h2></div><Link to="/jobs" className="text-sm font-semibold text-indigo-700">Browse all jobs</Link></div>
          {openJobs.length > 0 ? <div className="mt-7 grid gap-4 md:grid-cols-2">{openJobs.map((job) => <Link key={job.slug} to={`/jobs/${job.slug}`} className="group rounded-3xl border border-slate-200 p-5 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-black/5"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold text-slate-500">{job.workplace} · {job.type}</p><h3 className="mt-2 text-xl font-semibold text-slate-950">{job.title}</h3><p className="mt-3 text-sm text-slate-500">{job.location} · {job.salary}</p></div><ArrowRight size={18} className="text-indigo-700 transition group-hover:translate-x-1" /></div></Link>)}</div> : <div className="mt-7 rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">No public roles are open at this company right now.</div>}
        </div>
      </section>
    </>
  );
}

function SnapshotRow({ icon: Icon, label, value }) {
  return <div className="flex items-start gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-500"><Icon size={16} /></span><div><span className="block text-xs text-slate-400">{label}</span><strong className="mt-0.5 block text-sm font-semibold text-slate-700">{value}</strong></div></div>;
}
