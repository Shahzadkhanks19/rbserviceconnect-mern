import { Route, Routes } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import HomePage from './pages/public/HomePage.jsx';
import JobsPage from './pages/public/JobsPage.jsx';
import JobDetailsPage from './pages/public/JobDetailsPage.jsx';
import CompaniesPage from './pages/public/CompaniesPage.jsx';
import CompanyDetailsPage from './pages/public/CompanyDetailsPage.jsx';
import EmployersPage from './pages/public/EmployersPage.jsx';
import AboutPage from './pages/public/AboutPage.jsx';
import ContactPage from './pages/public/ContactPage.jsx';
import FaqPage from './pages/public/FaqPage.jsx';
import PrivacyPage from './pages/public/PrivacyPage.jsx';
import TermsPage from './pages/public/TermsPage.jsx';
import CookiesPage from './pages/public/CookiesPage.jsx';
import AccessibilityPage from './pages/public/AccessibilityPage.jsx';
import LoginPage from './pages/auth/LoginPage.jsx';
import RegisterPage from './pages/auth/RegisterPage.jsx';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage.jsx';
import ResetPasswordPage from './pages/auth/ResetPasswordPage.jsx';
import CandidateDashboard from './pages/candidate/CandidateDashboard.jsx';
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminLoginPage from './pages/admin/AdminLoginPage.jsx';
import NotFoundPage from './pages/public/NotFoundPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="jobs/:slug" element={<JobDetailsPage />} />
        <Route path="companies" element={<CompaniesPage />} />
        <Route path="companies/:slug" element={<CompanyDetailsPage />} />
        <Route path="employers" element={<EmployersPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="cookies" element={<CookiesPage />} />
        <Route path="accessibility" element={<AccessibilityPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
      </Route>
      <Route path="admin/login" element={<AdminLoginPage />} />
      <Route path="candidate" element={<DashboardLayout role="Candidate" />}>
        <Route index element={<CandidateDashboard />} />
      </Route>
      <Route path="recruiter" element={<DashboardLayout role="Recruiter" />}>
        <Route index element={<RecruiterDashboard />} />
      </Route>
      <Route path="admin" element={<DashboardLayout role="Admin" loginPath="/admin/login" />}>
        <Route index element={<AdminDashboard />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
