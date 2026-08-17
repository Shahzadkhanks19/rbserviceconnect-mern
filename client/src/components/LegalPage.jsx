import { ArrowRight, FileText, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LegalPage({ eyebrow = 'Legal', title, updated = 'August 2026', intro, sections }) {
  return (
    <>
      <section className="overflow-hidden border-b border-black/5 bg-[#F3E8A2]/55">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8 lg:py-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/70 bg-white/70 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-indigo-700">
              <FileText size={14} /> {eyebrow}
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-6xl">{title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">{intro}</p>
          </div>
          <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-xl shadow-amber-900/5 backdrop-blur sm:p-8">
            <span className="grid size-12 place-items-center rounded-2xl bg-[#879E83] text-white"><ShieldCheck size={21} /></span>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-indigo-700">Document status</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">Clear rules. Clear expectations.</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">Last updated: {updated}. Use the contact page if you need help understanding how this policy applies to your account or activity.</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-18">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {sections.map(({ title: sectionTitle, paragraphs = [], bullets = [] }, index) => (
              <section key={sectionTitle} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:border-slate-300 hover:bg-white sm:p-7">
                <div className="flex gap-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#879E83] text-xs font-bold text-white">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h2 className="text-xl font-semibold tracking-[-0.02em] text-slate-950">{sectionTitle}</h2>
                    <div className="mt-3 space-y-3 text-sm leading-7 text-slate-600">
                      {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                      {bullets.length > 0 && (
                        <ul className="space-y-2 pl-5">
                          {bullets.map((item) => <li key={item} className="list-disc marker:text-indigo-500">{item}</li>)}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-5 rounded-[2rem] bg-slate-950 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F3E8A2]">Need clarification?</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Talk to the RB Service Connect team.</h2>
            </div>
            <Link to="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600">
              Contact us <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
