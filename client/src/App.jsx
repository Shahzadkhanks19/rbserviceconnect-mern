import { Route, Routes } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import HomePage from './pages/public/HomePage.jsx';
import JobsPage from './pages/public/JobsPage.jsx';
import LoginPage from './pages/auth/LoginPage.jsx';
import RegisterPage from './pages/auth/RegisterPage.jsx';
import CandidateDashboard from './pages/candidate/CandidateDashboard.jsx';
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import NotFoundPage from './pages/public/NotFoundPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      <Route path="candidate" element={<DashboardLayout role="Candidate" />}>
        <Route index element={<CandidateDashboard />} />
      </Route>
      <Route path="recruiter" element={<DashboardLayout role="Recruiter" />}>
        <Route index element={<RecruiterDashboard />} />
      </Route>
      <Route path="admin" element={<DashboardLayout role="Admin" />}>
        <Route index element={<AdminDashboard />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
