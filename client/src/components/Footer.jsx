import {
  ArrowUpRight,
  BriefcaseBusiness,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const footerGroups = [
  {
    title: 'Candidates',
    links: [
      ['/jobs', 'Browse jobs'],
      ['/companies', 'Explore companies'],
      ['/register', 'Create profile'],
      ['/login', 'Candidate sign in'],
    ],
  },
  {
    title: 'Employers',
    links: [
      ['/register?role=recruiter', 'Post a job'],
      ['/register?role=recruiter', 'Create employer account'],
      ['/login', 'Recruiter sign in'],
      ['/about', 'Why RB Service Connect'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['/about', 'About us'],
      ['/contact', 'Contact'],
      ['/faq', 'Help & FAQ'],
      ['/privacy', 'Privacy'],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_2fr]">
          <div className="max-w-md">
            <Link to="/" className="inline-flex items-center gap-3" aria-label="RB Service Connect home">
              <span className="grid size-11 place-items-center rounded-2xl bg-white text-slate-950">
                <BriefcaseBusiness size={21} strokeWidth={1.9} />
              </span>
              <span>
                <strong className="block text-base tracking-[-0.02em]">RB Service Connect</strong>
                <span className="block text-xs text-slate-400">Talent. Opportunity. Growth.</span>
              </span>
            </Link>
            <p className="mt-6 text-sm leading-7 text-slate-400">
              A modern recruitment platform built to make hiring clearer for employers and career growth simpler for candidates.
            </p>
            <div className="mt-7 space-y-3 text-sm text-slate-400">
              <a href="mailto:connect@rbserviceconnect.com" className="flex items-center gap-3 transition hover:text-white">
                <Mail size={16} /> connect@rbserviceconnect.com
              </a>
              <a href="tel:+919999999999" className="flex items-center gap-3 transition hover:text-white">
                <Phone size={16} /> +91 99999 99999
              </a>
              <span className="flex items-center gap-3">
                <MapPin size={16} /> India
              </span>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-sm font-semibold text-white">{group.title}</h2>
                <div className="mt-5 space-y-3.5">
                  {group.links.map(([to, label]) => (
                    <Link key={`${to}-${label}`} to={to} className="block text-sm text-slate-400 transition hover:text-white">
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-6 text-slate-500">© 2026 RB Service Connect. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="RB Service Connect on LinkedIn"
              className="grid size-9 place-items-center rounded-lg border border-white/10 text-slate-400 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
            >
              <Linkedin size={16} />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 transition hover:text-white"
            >
              Talk to our team <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
