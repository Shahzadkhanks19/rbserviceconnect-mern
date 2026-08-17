const faqs = [
  ['Is RB Service Connect for candidates or recruiters?', 'Both. Candidates use it to discover and track opportunities, while recruiters use separate tools to post jobs and manage hiring pipelines.'],
  ['Can candidates create profiles and upload resumes?', 'Yes. Candidate profile and resume management are part of the planned authenticated candidate workspace.'],
  ['How are recruiters handled?', 'Recruiter accounts are designed to support employer verification and role-based access before hiring features are enabled.'],
  ['Can I track my job application status?', 'Yes. The platform architecture includes structured application states so candidates can follow progress through the hiring process.'],
  ['Will employers have their own company profiles?', 'Yes. Company profiles, active jobs, recruiter ownership, and employer-facing information are part of the platform model.'],
  ['Is the platform mobile friendly?', 'Yes. The public site and dashboards are being designed responsively with Tailwind CSS across desktop, tablet, and mobile layouts.'],
];

export default function FaqPage() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Help & FAQ</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">Common questions, clear answers.</h1>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">A quick overview of how RB Service Connect is structured for candidates and employers.</p>
        </div>
        <div className="mt-10 space-y-4">
          {faqs.map(([question, answer]) => (
            <article key={question} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="font-semibold text-slate-950">{question}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
