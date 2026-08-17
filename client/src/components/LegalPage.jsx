import { Link } from 'react-router-dom';

export default function LegalPage({ eyebrow = 'Legal', title, updated = 'August 2026', intro, sections }) {
  return (
    <section className="bg-white py-14 sm:py-18">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-700">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">{title}</h1>
        <p className="mt-4 text-sm text-slate-500">Last updated: {updated}</p>
        <p className="mt-6 text-base leading-8 text-slate-600">{intro}</p>

        <div className="mt-10 space-y-8">
          {sections.map(({ title: sectionTitle, paragraphs = [], bullets = [] }) => (
            <section key={sectionTitle} className="border-t border-slate-200 pt-7">
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-slate-950">{sectionTitle}</h2>
              <div className="mt-3 space-y-3 text-sm leading-7 text-slate-600">
                {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {bullets.length > 0 && (
                  <ul className="space-y-2 pl-5">
                    {bullets.map((item) => <li key={item} className="list-disc">{item}</li>)}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-[#F3E8A2]/55 p-5 text-sm leading-6 text-slate-700">
          Questions about this page? <Link to="/contact" className="font-semibold text-indigo-700 hover:text-indigo-600">Contact RB Service Connect</Link>.
        </div>
      </div>
    </section>
  );
}
