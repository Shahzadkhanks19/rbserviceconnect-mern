import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Contact</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">Talk to the RB Service Connect team.</h1>
          <p className="mt-5 max-w-xl leading-8 text-slate-600">Questions about job applications, recruiter accounts, employer verification, or the platform? Send us a message and we’ll route it to the right team.</p>
          <div className="mt-8 space-y-4 text-sm text-slate-600">
            <span className="flex items-center gap-3"><Mail size={17} className="text-indigo-600" /> connect@rbserviceconnect.com</span>
            <span className="flex items-center gap-3"><Phone size={17} className="text-indigo-600" /> +91 99999 99999</span>
            <span className="flex items-center gap-3"><MapPin size={17} className="text-indigo-600" /> India</span>
          </div>
        </div>

        <form className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold text-slate-700">Name<input type="text" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-normal text-slate-950 outline-none transition focus:border-indigo-400" placeholder="Your name" /></label>
            <label className="text-sm font-semibold text-slate-700">Email<input type="email" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-normal text-slate-950 outline-none transition focus:border-indigo-400" placeholder="you@example.com" /></label>
          </div>
          <label className="mt-5 block text-sm font-semibold text-slate-700">Topic<select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-normal text-slate-950 outline-none transition focus:border-indigo-400"><option>General enquiry</option><option>Candidate support</option><option>Recruiter support</option><option>Employer verification</option></select></label>
          <label className="mt-5 block text-sm font-semibold text-slate-700">Message<textarea rows="6" className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm font-normal text-slate-950 outline-none transition focus:border-indigo-400" placeholder="How can we help?" /></label>
          <button type="submit" className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500">Send message</button>
        </form>
      </div>
    </section>
  );
}
