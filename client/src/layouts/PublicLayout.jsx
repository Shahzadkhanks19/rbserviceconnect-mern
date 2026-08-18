import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';

export default function PublicLayout(){
  return <div className="min-h-screen bg-slate-50 text-slate-950">
    <a href="#main-content" className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-transform focus:translate-y-0">Skip to main content</a>
    <Header/>
    <main id="main-content" tabIndex="-1" className="min-h-[60vh]"><Outlet/></main>
    <Footer/>
  </div>;
}
