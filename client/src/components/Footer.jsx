import { BriefcaseBusiness } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div className="max-w-md">
          <div className="mb-4 flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-slate-950 text-white"><BriefcaseBusiness size={20} /></span><strong>RB Service Connect</strong></div>
          <p className="text-sm leading-6 text-slate-500">A modern recruitment platform connecting ambitious candidates with trusted employers and better career opportunities.</p>
        </div>
        <div><h2 className="mb-4 text-sm font-semibold">Explore</h2><div className="space-y-3 text-sm text-slate-500"><Link className="block hover:text-slate-950" to="/jobs">Find Jobs</Link><Link className="block hover:text-slate-950" to="/register">Create Account</Link></div></div>
        <div><h2 className="mb-4 text-sm font-semibold">For employers</h2><div className="space-y-3 text-sm text-slate-500"><Link className="block hover:text-slate-950" to="/register?role=recruiter">Post a Job</Link><Link className="block hover:text-slate-950" to="/login">Recruiter Sign In</Link></div></div>
      </div>
      <div className="border-t border-slate-200 px-4 py-5 text-center text-xs text-slate-500">© 2026 RB Service Connect. All rights reserved.</div>
    </footer>
  );
}
