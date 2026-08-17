const sections = [
  ['Information we collect', 'RB Service Connect may process account information, candidate profile details, recruiter and company information, job applications, uploaded documents, and platform activity needed to provide recruitment services.'],
  ['How information is used', 'Information is used to operate accounts, support job discovery and applications, enable recruiter workflows, improve platform security, and provide relevant service communications.'],
  ['Role-based access', 'Candidate, recruiter, and administrator access is separated so users only receive functionality and data appropriate to their role and permissions.'],
  ['Data security', 'The platform is designed with secure authentication, protected sessions, validation, access controls, security headers, and other safeguards appropriate to a modern recruitment application.'],
  ['Data retention', 'Information should only be retained for as long as needed for platform operation, legal obligations, security, dispute handling, and legitimate business requirements.'],
  ['Your choices', 'Users should be able to review and update key account information and may contact RB Service Connect regarding account or privacy requests.'],
];

export default function PrivacyPage() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Legal</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-sm text-slate-500">Last updated: August 2026</p>
        <p className="mt-6 leading-8 text-slate-600">This page provides the current privacy framework for the RB Service Connect rebuild. Final production wording should be reviewed against the actual deployed data flows, vendors, retention rules, and applicable legal requirements before launch.</p>
        <div className="mt-10 space-y-8">
          {sections.map(([title, copy]) => (
            <section key={title} className="border-t border-slate-200 pt-7">
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-slate-950">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{copy}</p>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
