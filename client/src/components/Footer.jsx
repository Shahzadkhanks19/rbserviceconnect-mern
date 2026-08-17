import { ArrowUpRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const logoUrl = 'https://media.githubusercontent.com/media/Shahzadkhanks19/rbserviceconnect/main/images/Royalties-Service-Connect.png';

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
    <footer className="bg-emerald-500 text-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_2fr]">
          <div className="max-w-md">
            <Link to="/" className="inline-flex rounded-2xl bg-emerald-500" aria-label="Royalties Service Connect home">
              <img src={logoUrl} alt="Royalties Service Connect" className="h-24 w-auto object-contain" />
            </Link>
            <p className="mt-6 text-sm leading-7 text-slate-800">
              A modern recruitment platform built to make hiring clearer for employers and career growth simpler for candidates.
            </p>
            <div className="mt-7 flex items-center gap-3 text-sm text-slate-800">
              <MapPin size={16} /> India
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-sm font-bold text-slate-950">{group.title}</h2>
                <div className="mt-5 space-y-3.5">
                  {group.links.map(([to, label]) => (
                    <Link key={`${to}-${label}`} to={to} className="block text-sm text-slate-800 transition hover:text-white">
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-slate-900/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-6 text-slate-700">© 2026 RB Service Connect. All rights reserved.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 transition hover:text-white"
          >
            Talk to our team <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
