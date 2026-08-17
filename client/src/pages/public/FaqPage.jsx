import { ChevronDown } from 'lucide-react';

const faqs = [
  ['Who is RB Service Connect for?', 'RB Service Connect serves both candidates and employers. Candidates can discover opportunities and manage their job-search activity, while approved recruiters use a separate workspace for jobs, applicants, and hiring workflows.'],
  ['How do recruiter accounts work?', 'Employer accounts are reviewed before recruiter tools are activated. This approval step helps keep hiring activity accountable and separates public registration from access to candidate data.'],
  ['Can I search jobs without an account?', 'Yes. Public job listings and company profiles can be explored without signing in. An account is required for authenticated actions such as applying, saving activity, or using a dashboard.'],
  ['How do company profiles work?', 'Company profiles bring employer information and open opportunities together so candidates can understand an organization before opening a role or submitting an application.'],
  ['Why can’t a new recruiter sign in immediately?', 'New recruiter accounts start in a pending state. An administrator must approve the account before recruiter tools become available.'],
  ['How is account access separated?', 'Candidate, recruiter, and administrator workspaces use role-aware authentication and protected routes so each type of user only accesses the functionality intended for that role.'],
  ['What should I do if I need help?', 'Use the Contact page and choose the most relevant topic—candidate support, recruiter support, employer verification, accessibility, or a general enquiry.'],
  ['Can I reset a forgotten password?', 'Yes. Use the Forgot password link on the sign-in page. Password-reset links are time-limited and can only be used once.'],
];

export default function FaqPage() {
  return (
    <section className="bg-white py-14 sm:py-18">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-700">Help & FAQ</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">Common questions, clear answers.</h1>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">Quick answers about accounts, recruiter approval, jobs, companies, security, and support.</p>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map(([question, answer], index) => (
            <details key={question} className="group rounded-2xl border border-slate-200 bg-slate-50 p-5" open={index === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-950">
                <span>{question}</span>
                <ChevronDown size={18} className="shrink-0 text-slate-400 transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 pr-8 text-sm leading-7 text-slate-600">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
