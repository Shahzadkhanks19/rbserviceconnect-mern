import { ChevronDown, HelpCircle, MessageCircleQuestion } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <section className="overflow-hidden bg-[#F3E8A2]/60">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-20">
          <div className="self-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/70 bg-white/70 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-indigo-700">
              <HelpCircle size={14} /> Help centre
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-6xl">Answers without the runaround.</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">Find clear answers about accounts, recruiter approval, jobs, companies, security, and support.</p>
          </div>
          <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-xl shadow-amber-900/5 backdrop-blur sm:p-8">
            <MessageCircleQuestion size={26} className="text-indigo-700" />
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-slate-950">Still need help?</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">Send your question to the right support category and we’ll keep the enquiry organized.</p>
            <Link to="/contact" className="mt-6 inline-flex rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600">Contact support</Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-18">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {faqs.map(([question, answer], index) => {
              const isOpen = openIndex === index;
              return (
                <article key={question} className={`overflow-hidden rounded-2xl border transition ${isOpen ? 'border-indigo-300 bg-[#F3E8A2]/20 shadow-md shadow-black/5' : 'border-slate-200 bg-slate-50 hover:border-slate-300'}`}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex((current) => (current === index ? -1 : index))}
                  >
                    <span className="font-semibold text-slate-950">{question}</span>
                    <span className={`grid size-9 shrink-0 place-items-center rounded-full transition ${isOpen ? 'bg-indigo-500 text-white' : 'bg-white text-slate-500'}`}>
                      <ChevronDown size={18} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-200 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 pr-14 text-sm leading-7 text-slate-600 sm:px-6 sm:pb-6 sm:pr-16">{answer}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
