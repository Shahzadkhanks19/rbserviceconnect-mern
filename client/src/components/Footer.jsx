import { ArrowUpRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const logoUrl = '/images/rb-service-connect-logo.webp';

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
    <footer className="bg-blue-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_2fr]">
          <div className="max-w-md">
            <Link to="/" className="inline-flex rounded-2xl bg-white px-3 py-2" aria-label="RB Service Connect home">
              <img src={logoUrl} alt="RB Service Connect" className="h-11 w-auto object-contain" />
            </Link>
            <p className="mt-6 text-sm leading-7 text-blue-100/70">
              A modern recruitment platform built to make hiring clearer for employers and career growth simpler for candidates.
            </p>
            <div className="mt-7 flex items-center gap-3 text-sm text-blue-100/70">
              <MapPin size={16} /> India
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-sm font-semibold text-white">{group.title}</h2>
                <div className="mt-5 space-y-3.5">
                  {group.links.map(([to, label]) => (
                    <Link key={`${to}-${label}`} to={to} className="block text-sm text-blue-100/65 transition hover:text-white">
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-6 text-blue-100/50">© 2026 RB Service Connect. All rights reserved.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-xs font-semibold text-blue-100/80 transition hover:text-white"
          >
            Talk to our team <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
