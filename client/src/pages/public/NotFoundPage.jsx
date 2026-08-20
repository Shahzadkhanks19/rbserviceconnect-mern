import { ArrowLeft, BriefcaseBusiness, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const focus='focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950';

export default function NotFoundPage(){
  return (
    <main className="relative grid min-h-[calc(100vh-5rem)] place-items-center overflow-hidden bg-slate-950 px-4 py-16 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.18),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.12),transparent_28%)]" aria-hidden="true"/>
      <section className="relative mx-auto max-w-2xl text-center" aria-labelledby="not-found-title">
        <div className="mx-auto grid size-14 place-items-center rounded-2xl border border-white/10 bg-white/5 text-indigo-300 shadow-2xl shadow-black/20" aria-hidden="true"><Search size={24}/></div>
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-indigo-300">Error 404</p>
        <h1 id="not-found-title" className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">We couldn’t find that page.</h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">The link may be outdated, the page may have moved, or the address may have been entered incorrectly. You can return home or continue browsing current opportunities.</p>
        <nav className="mt-8 flex flex-wrap justify-center gap-3" aria-label="404 recovery links">
          <Link to="/" className={`inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100 motion-reduce:transform-none ${focus}`}><ArrowLeft size={16} aria-hidden="true"/>Back home</Link>
          <Link to="/jobs" className={`inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10 motion-reduce:transform-none ${focus}`}><BriefcaseBusiness size={16} aria-hidden="true"/>Browse jobs</Link>
        </nav>
      </section>
    </main>
  );
}
