import { ArrowRight, Building2, MapPin, Search, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';

const companies = [
  ['ND', 'Northstar Digital', 'Technology', 'Bengaluru', '12 open roles'],
  ['AL', 'Aster Labs', 'Product & Design', 'Remote · India', '8 open roles'],
  ['VC', 'Verde Commerce', 'E-commerce', 'Gurugram', '6 open roles'],
  ['FM', 'Finmark Advisory', 'Finance', 'Mumbai', '9 open roles'],
  ['HC', 'Horizon Care', 'Healthcare', 'Pune', '5 open roles'],
  ['OP', 'Orbit Partners', 'Operations', 'Delhi NCR', '7 open roles'],
];

export default function CompaniesPage() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Company directory</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">Explore employers before you apply.</h1>
          <p className="mt-5 max-w-2xl leading-8 text-slate-600">Discover company profiles, industries, locations, and active opportunities from employers using RB Service Connect.</p>
        </div>

        <div className="mt-8 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <Search size={19} className="text-slate-400" />
          <input type="search" aria-label="Search companies" placeholder="Search company or industry" className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400" />
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {companies.map(([initials, name, industry, location, roles]) => (
            <article key={name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-slate-950/5">
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-12 place-items-center rounded-2xl bg-slate-950 text-xs font-bold text-white">{initials}</span>
                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700">Verified</span>
              </div>
              <h2 className="mt-5 text-xl font-semibold tracking-[-0.025em] text-slate-950">{name}</h2>
              <p className="mt-1 text-sm text-slate-500">{industry}</p>
              <div className="mt-5 space-y-2 text-sm text-slate-500">
                <span className="flex items-center gap-2"><MapPin size={15} /> {location}</span>
                <span className="flex items-center gap-2"><UsersRound size={15} /> {roles}</span>
              </div>
              <Link to="/jobs" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600">View opportunities <ArrowRight size={15} /></Link>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-indigo-100 bg-indigo-50 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div className="flex gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-indigo-600"><Building2 size={20} /></span><div><h2 className="font-semibold text-slate-950">Hiring for your company?</h2><p className="mt-1 text-sm text-slate-600">Create a recruiter account and build your employer presence.</p></div></div>
          <Link to="/register?role=recruiter" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white sm:mt-0">Get started <ArrowRight size={15} /></Link>
        </div>
      </div>
    </section>
  );
}
