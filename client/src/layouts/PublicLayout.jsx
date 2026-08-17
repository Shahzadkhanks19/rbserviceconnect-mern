import { Outlet } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main><Outlet /></main>
      <Footer />
    </div>
  );
}
