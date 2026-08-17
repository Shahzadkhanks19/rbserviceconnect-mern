import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Header />
      <main className="min-h-[60vh]"><Outlet /></main>
      <Footer />
    </div>
  );
}
