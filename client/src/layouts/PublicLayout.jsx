import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';

export default function PublicLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname, location.search]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Header />
      <main className="min-h-[60vh]"><Outlet /></main>
      <Footer />
    </div>
  );
}
