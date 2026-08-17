import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import PublicLayout from './layouts/PublicLayout.jsx';

const HomePage = lazy(() => import('./pages/public/HomePage.jsx'));
const JobsPage = lazy(() => import('./pages/public/JobsPage.jsx'));
const JobDetailsPage = lazy(() => import('./pages/public/JobDetailsPage.jsx'));
const CompaniesPage = lazy(() => import('./pages/public/CompaniesPage.jsx'));
const CompanyDetailsPage = lazy(() => import('./pages/public/CompanyDetailsPage.jsx'));
const EmployersPage = lazy(() => import('./pages/public/EmployersPage.jsx'));
const AboutPage = lazy(() => import('./pages/public/AboutPage.jsx'));
const ContactPage = lazy(() => import('./pages/public/ContactPage.jsx'));
const FaqPage = lazy(() => import('./pages/public/FaqPage.jsx'));
const PrivacyPage = lazy(() => import('./pages/public/PrivacyPage.jsx'));
const TermsPage = lazy(() => import('./pages/public/TermsPage.jsx'));
const CookiesPage = lazy(() => import('./pages/public/CookiesPage.jsx'));
const AccessibilityPage = lazy(() => import('./pages/public/AccessibilityPage.jsx'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage.jsx'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage.jsx'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage.jsx'));
const ResetPasswordPage = lazy(() => import('./pages/auth/ResetPasswordPage.jsx'));
const CandidateOverviewPage = lazy(() => import('./pages/candidate/CandidateOverviewPage.jsx'));
const CandidateProfilePage = lazy(() => import('./pages/candidate/CandidateProfilePage.jsx'));
const CandidateResumePage = lazy(() => import('./pages/candidate/CandidateResumePage.jsx'));
const CandidateSavedJobsPage = lazy(() => import('./pages/candidate/CandidateSavedJobsPage.jsx'));
const CandidateApplicationsPage = lazy(() => import('./pages/candidate/CandidateApplicationsPage.jsx'));
const CandidateSettingsPage = lazy(() => import('./pages/candidate/CandidateSettingsPage.jsx'));
const RecruiterOverviewPage = lazy(() => import('./pages/recruiter/RecruiterOverviewPage.jsx'));
const RecruiterCompanyPage = lazy(() => import('./pages/recruiter/RecruiterCompanyPage.jsx'));
const RecruiterJobsPage = lazy(() => import('./pages/recruiter/RecruiterJobsPage.jsx'));
const RecruiterApplicantsPage = lazy(() => import('./pages/recruiter/RecruiterApplicantsPage.jsx'));
const RecruiterSettingsPage = lazy(() => import('./pages/recruiter/RecruiterSettingsPage.jsx'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard.jsx'));
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/public/NotFoundPage.jsx'));

function RouteFallback(){return <div className="grid min-h-[45vh] place-items-center bg-white px-4 text-center"><div><span className="mx-auto block size-9 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-500" aria-hidden="true"/><p className="mt-4 text-sm font-medium text-slate-500">Loading page…</p></div></div>}
function ScrollToTop(){const location=useLocation();useEffect(()=>{window.scrollTo({top:0,left:0,behavior:'auto'});},[location.pathname,location.search]);return null}

export default function App(){return <><ScrollToTop/><Suspense fallback={<RouteFallback/>}><Routes>
  <Route element={<PublicLayout/>}><Route index element={<HomePage/>}/><Route path="jobs" element={<JobsPage/>}/><Route path="jobs/:slug" element={<JobDetailsPage/>}/><Route path="companies" element={<CompaniesPage/>}/><Route path="companies/:slug" element={<CompanyDetailsPage/>}/><Route path="employers" element={<EmployersPage/>}/><Route path="about" element={<AboutPage/>}/><Route path="contact" element={<ContactPage/>}/><Route path="faq" element={<FaqPage/>}/><Route path="privacy" element={<PrivacyPage/>}/><Route path="terms" element={<TermsPage/>}/><Route path="cookies" element={<CookiesPage/>}/><Route path="accessibility" element={<AccessibilityPage/>}/><Route path="login" element={<LoginPage/>}/><Route path="register" element={<RegisterPage/>}/><Route path="forgot-password" element={<ForgotPasswordPage/>}/><Route path="reset-password" element={<ResetPasswordPage/>}/></Route>
  <Route path="admin/login" element={<AdminLoginPage/>}/>
  <Route path="candidate" element={<DashboardLayout role="Candidate"/>}><Route index element={<CandidateOverviewPage/>}/><Route path="profile" element={<CandidateProfilePage/>}/><Route path="resume" element={<CandidateResumePage/>}/><Route path="saved-jobs" element={<CandidateSavedJobsPage/>}/><Route path="applications" element={<CandidateApplicationsPage/>}/><Route path="settings" element={<CandidateSettingsPage/>}/></Route>
  <Route path="recruiter" element={<DashboardLayout role="Recruiter"/>}><Route index element={<RecruiterOverviewPage/>}/><Route path="company" element={<RecruiterCompanyPage/>}/><Route path="jobs" element={<RecruiterJobsPage/>}/><Route path="applicants" element={<RecruiterApplicantsPage/>}/><Route path="settings" element={<RecruiterSettingsPage/>}/></Route>
  <Route path="admin" element={<DashboardLayout role="Admin" loginPath="/admin/login"/>}><Route index element={<AdminDashboard/>}/></Route>
  <Route path="*" element={<NotFoundPage/>}/>
</Routes></Suspense></>}
