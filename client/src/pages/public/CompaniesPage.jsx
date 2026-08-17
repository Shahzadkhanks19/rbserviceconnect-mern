import { useMemo, useState } from 'react';
import { ArrowRight, Building2, MapPin, Search, ShieldCheck, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { companies, getCompanyJobs } from '../../data/companies.js';

export default function CompaniesPage() {
  const [query, setQuery] = useState('');

  const filteredCompanies = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return companies;
    return companies.filter((company) => [company.name, company.industry, company.location, company.workplace].join(' ').toLowerCase().includes(normalized));
  }, [query]);

  return (
    <>
      <section className="border-b border-slate-200 bg-[#F3E8A2]/55">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_.65fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-700">Company directory</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">Know where you’re applying.</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">Explore verified employers, understand how they work, and see active opportunities before you apply.</p>
            </div>
            <div className="rounded-3xl border border-black/5 bg-white p-3 shadow-xl shadow-black/5">
              <label className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3.5 focus-within:ring-2 focus-within:ring-indigo-200">
                <Search size={19} className="shrink-0 text-slate-400" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" aria-label="Search companies" placeholder="Search company, industry, or location" className="min-w-0 flex-1 bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400" />
              </label>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div><p className="text-sm font-semibold text-slate-950">{filteredCompanies.length} verified employers</p><p className="mt-1 text-xs text-slate-500">Employer profiles currently represented on RB Service Connect.</p></div>
            <Link to="/register?role=recruiter" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700">List your company <ArrowRight size={15} /></Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredCompanies.map((company) => {
              const openJobs = getCompanyJobs(company.name).length;
              return (
                <article key={company.slug} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-black/5">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-14 place-items-center rounded-2xl bg-[#879E83] text-sm font-bold text-white">{company.initials}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700"><ShieldCheck size={13} /> Verified</span>
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-slate-950">{company.name}</h2>
                  <p className="mt-1 text-sm font-medium text-indigo-700">{company.industry}</p>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{company.summary}</p>
                  <div className="mt-5 space-y-2.5 text-sm text-slate-500">
                    <span className="flex items-center gap-2"><MapPin size={15} /> {company.location}</span>
                    <span className="flex items-center gap-2"><UsersRound size={15} /> {company.size}</span>
                    <span className="flex items-center gap-2"><Building2 size={15} /> {openJobs} open {openJobs === 1 ? 'role' : 'roles'}</span>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5">
                    <span className="text-xs font-medium text-slate-400">{company.workplace}</span>
                    <Link to={`/companies/${company.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 transition group-hover:gap-3">View company <ArrowRight size={15} /></Link>
                  </div>
                </article>
              );
            })}
          </div>

          {filteredCompanies.length === 0 && <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"><Search size={28} className="mx-auto text-slate-300" /><h2 className="mt-4 text-xl font-semibold text-slate-950">No companies match that search.</h2><p className="mt-2 text-sm text-slate-500">Try a company name, industry, city, or work style.</p></div>}

          <div className="mt-10 rounded-3xl bg-[#879E83] p-6 text-white sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
            <div className="flex gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/15"><Building2 size={21} /></span><div><h2 className="text-xl font-semibold">Hiring for your company?</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-white/80">Create a recruiter account, establish a verified employer profile, and manage roles and applicants from one hiring workspace.</p></div></div>
            <Link to="/register?role=recruiter" className="mt-5 inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#E59D39] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 sm:mt-0">Get started <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
