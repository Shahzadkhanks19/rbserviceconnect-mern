import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import PageSkeleton from './components/PageSkeleton.jsx';
import ScrollToTopButton from './components/ScrollToTopButton.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import MemberLayout from './layouts/MemberLayout.jsx';
import PublicLayout from './layouts/PublicLayout.jsx';

const HomePage=lazy(()=>import('./pages/public/HomePage.jsx'));
const JobsPage=lazy(()=>import('./pages/public/JobsPage.jsx'));
const JobDetailsPage=lazy(()=>import('./pages/public/JobDetailsPage.jsx'));
const CompaniesPage=lazy(()=>import('./pages/public/CompaniesPage.jsx'));
const CompanyDetailsPage=lazy(()=>import('./pages/public/CompanyDetailsPage.jsx'));
const EmployersPage=lazy(()=>import('./pages/public/EmployersPage.jsx'));
const AboutPage=lazy(()=>import('./pages/public/AboutPage.jsx'));
const ContactPage=lazy(()=>import('./pages/public/ContactPage.jsx'));
const FaqPage=lazy(()=>import('./pages/public/FaqPage.jsx'));
const PrivacyPage=lazy(()=>import('./pages/public/PrivacyPage.jsx'));
const TermsPage=lazy(()=>import('./pages/public/TermsPage.jsx'));
const CookiesPage=lazy(()=>import('./pages/public/CookiesPage.jsx'));
const AccessibilityPage=lazy(()=>import('./pages/public/AccessibilityPage.jsx'));
const ErrorPage=lazy(()=>import('./pages/public/ErrorPage.jsx'));
const LoginPage=lazy(()=>import('./pages/auth/LoginPage.jsx'));
const RegisterPage=lazy(()=>import('./pages/auth/RegisterPage.jsx'));
const VerifyEmailPage=lazy(()=>import('./pages/auth/VerifyEmailPage.jsx'));
const ForgotPasswordPage=lazy(()=>import('./pages/auth/ForgotPasswordPage.jsx'));
const ResetPasswordPage=lazy(()=>import('./pages/auth/ResetPasswordPage.jsx'));
const CandidateOverviewPage=lazy(()=>import('./pages/candidate/CandidateOverviewPage.jsx'));
const CandidateProfilePage=lazy(()=>import('./pages/candidate/CandidateProfilePage.jsx'));
const CandidateResumePage=lazy(()=>import('./pages/candidate/CandidateResumePage.jsx'));
const CandidateSavedJobsPage=lazy(()=>import('./pages/candidate/CandidateSavedJobsPage.jsx'));
const CandidateApplicationsPage=lazy(()=>import('./pages/candidate/CandidateApplicationsPage.jsx'));
const CandidateJobAlertsPage=lazy(()=>import('./pages/candidate/CandidateJobAlertsPage.jsx'));
const CandidateInterviewsPage=lazy(()=>import('./pages/candidate/CandidateInterviewsPage.jsx'));
const CandidateCareerProgramsPage=lazy(()=>import('./pages/candidate/CandidateCareerProgramsPage.jsx'));
const CandidateBillingPage=lazy(()=>import('./pages/candidate/CandidateBillingPage.jsx'));
const CandidateSettingsPage=lazy(()=>import('./pages/candidate/CandidateSettingsPage.jsx'));
const RecruiterOverviewPage=lazy(()=>import('./pages/recruiter/RecruiterOverviewPage.jsx'));
const RecruiterCompanyPage=lazy(()=>import('./pages/recruiter/RecruiterCompanyPage.jsx'));
const RecruiterJobsPage=lazy(()=>import('./pages/recruiter/RecruiterJobsPage.jsx'));
const RecruiterApplicantsPage=lazy(()=>import('./pages/recruiter/RecruiterApplicantsPage.jsx'));
const RecruiterCandidateSearchPage=lazy(()=>import('./pages/recruiter/RecruiterCandidateSearchPage.jsx'));
const RecruiterTalentPoolsPage=lazy(()=>import('./pages/recruiter/RecruiterTalentPoolsPage.jsx'));
const RecruiterInterviewsPage=lazy(()=>import('./pages/recruiter/RecruiterInterviewsPage.jsx'));
const RecruiterSettingsPage=lazy(()=>import('./pages/recruiter/RecruiterSettingsPage.jsx'));
const PromotionsPage=lazy(()=>import('./pages/shared/PromotionsPage.jsx'));
const PlacementsPage=lazy(()=>import('./pages/shared/PlacementsPage.jsx'));
const SafetyCenterPage=lazy(()=>import('./pages/shared/SafetyCenterPage.jsx'));
const WorkspaceNotificationsPage=lazy(()=>import('./pages/shared/WorkspaceNotificationsPage.jsx'));
const WorkspaceMessagesPage=lazy(()=>import('./pages/shared/WorkspaceMessagesPage.jsx'));
const AdminOverviewPage=lazy(()=>import('./pages/admin/AdminOverviewPage.jsx'));
const AdminRecruiterApprovalsPage=lazy(()=>import('./pages/admin/AdminDashboard.jsx'));
const AdminCollectionPage=lazy(()=>import('./pages/admin/AdminCollectionPage.jsx'));
const AdminAnalyticsPage=lazy(()=>import('./pages/admin/AdminAnalyticsPage.jsx'));
const AdminPromotionsPage=lazy(()=>import('./pages/admin/AdminPromotionsPage.jsx'));
const AdminCareerProgramsPage=lazy(()=>import('./pages/admin/AdminCareerProgramsPage.jsx'));
const AdminPlacementsPage=lazy(()=>import('./pages/admin/AdminPlacementsPage.jsx'));
const AdminBillingPage=lazy(()=>import('./pages/admin/AdminBillingPage.jsx'));
const AdminModerationPage=lazy(()=>import('./pages/admin/AdminModerationPage.jsx'));
const AdminSettingsPage=lazy(()=>import('./pages/admin/AdminSettingsPage.jsx'));
const AdminLoginPage=lazy(()=>import('./pages/admin/AdminLoginPage.jsx'));
const NotFoundPage=lazy(()=>import('./pages/public/NotFoundPage.jsx'));

const meta={
  '/':['Careers & Hiring','Discover relevant opportunities, manage applications, and connect candidates with verified employers on RB Service Connect.'],
  '/jobs':['Find Jobs','Browse current opportunities by role, location, experience, workplace type, and employment type on RB Service Connect.'],
  '/companies':['Companies','Explore verified employers and their active opportunities on RB Service Connect.'],
  '/employers':['For Employers','Post jobs, source candidates, manage applicants, interviews, talent pools, and hiring workflows with RB Service Connect.'],
  '/about':['About Us','Learn about RB Service Connect and the recruitment experience built for candidates, recruiters, and hiring teams.'],
  '/contact':['Contact Us','Contact the RB Service Connect team for candidate, recruiter, hiring, or platform support.'],
  '/faq':['Frequently Asked Questions','Find answers about accounts, applications, recruiter access, job posting, hiring workflows, privacy, and platform use.'],
  '/privacy':['Privacy Policy','Read the RB Service Connect privacy policy and how account, recruitment, and platform data is handled.'],
  '/terms':['Terms & Conditions','Read the terms and conditions governing use of RB Service Connect.'],
  '/cookies':['Cookie Policy','Learn how RB Service Connect uses cookies and session technologies.'],
  '/accessibility':['Accessibility','Read the RB Service Connect accessibility commitment and guidance.'],
  '/error':['Application Error','Recovery page for an unexpected RB Service Connect application error.'],
  '/login':['Sign In','Sign in to your RB Service Connect candidate or recruiter account.'],
  '/register':['Create Account','Create a candidate or recruiter account on RB Service Connect.'],
  '/verify-email':['Verify Email','Verify your RB Service Connect account email address.'],
  '/forgot-password':['Forgot Password','Request a secure RB Service Connect password reset link.'],
  '/reset-password':['Reset Password','Choose a new password for your RB Service Connect account.'],
  '/admin/login':['Admin Sign In','Secure administrator access for RB Service Connect.'],
};

const privatePrefixes=['/candidate','/recruiter','/admin'];
const noIndexPaths=new Set(['/login','/register','/verify-email','/forgot-password','/reset-password','/admin/login','/error']);

function pageMeta(pathname){
  if(meta[pathname])return meta[pathname];
  if(pathname.startsWith('/jobs/'))return ['Job Details','Review job responsibilities, requirements, benefits, hiring status, and application details on RB Service Connect.'];
  if(pathname.startsWith('/companies/'))return ['Company Details','Explore a verified employer profile and active opportunities on RB Service Connect.'];
  if(pathname.startsWith('/candidate'))return ['Candidate Account','Manage your RB Service Connect career activity.'];
  if(pathname.startsWith('/recruiter'))return ['Recruiter Account','Manage hiring activity on RB Service Connect.'];
  if(pathname.startsWith('/admin'))return ['Admin Workspace','Manage RB Service Connect platform operations.'];
  return ['Page Not Found','The requested RB Service Connect page could not be found.'];
}

function setMeta(name,content){
  let tag=document.head.querySelector(`meta[name="${name}"]`);
  if(!tag){
    tag=document.createElement('meta');
    tag.setAttribute('name',name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content',content);
}

function RouteEffects(){
  const location=useLocation();
  useEffect(()=>{
    window.scrollTo({top:0,left:0,behavior:'auto'});
    const [title,description]=pageMeta(location.pathname);
    document.title=`${title} | RB Service Connect`;
    setMeta('description',description);
    const noIndex=noIndexPaths.has(location.pathname)||privatePrefixes.some((prefix)=>location.pathname===prefix||location.pathname.startsWith(`${prefix}/`));
    setMeta('robots',noIndex?'noindex, nofollow, noarchive':'index, follow, max-image-preview:large');
  },[location.pathname,location.search]);
  return null;
}

export default function App(){
  return <>
    <RouteEffects/>
    <Suspense fallback={<PageSkeleton/>}>
      <Routes>
        <Route element={<PublicLayout/>}>
          <Route index element={<HomePage/>}/>
          <Route path="jobs" element={<JobsPage/>}/>
          <Route path="jobs/:slug" element={<JobDetailsPage/>}/>
          <Route path="companies" element={<CompaniesPage/>}/>
          <Route path="companies/:slug" element={<CompanyDetailsPage/>}/>
          <Route path="employers" element={<EmployersPage/>}/>
          <Route path="about" element={<AboutPage/>}/>
          <Route path="contact" element={<ContactPage/>}/>
          <Route path="faq" element={<FaqPage/>}/>
          <Route path="privacy" element={<PrivacyPage/>}/>
          <Route path="terms" element={<TermsPage/>}/>
          <Route path="cookies" element={<CookiesPage/>}/>
          <Route path="accessibility" element={<AccessibilityPage/>}/>
          <Route path="error" element={<ErrorPage/>}/>
          <Route path="login" element={<LoginPage/>}/>
          <Route path="register" element={<RegisterPage/>}/>
          <Route path="verify-email" element={<VerifyEmailPage/>}/>
          <Route path="forgot-password" element={<ForgotPasswordPage/>}/>
          <Route path="reset-password" element={<ResetPasswordPage/>}/>
        </Route>

        <Route path="admin/login" element={<AdminLoginPage/>}/>

        <Route path="candidate" element={<MemberLayout role="Candidate"/>}>
          <Route index element={<CandidateOverviewPage/>}/>
          <Route path="profile" element={<CandidateProfilePage/>}/>
          <Route path="resume" element={<CandidateResumePage/>}/>
          <Route path="saved-jobs" element={<CandidateSavedJobsPage/>}/>
          <Route path="applications" element={<CandidateApplicationsPage/>}/>
          <Route path="job-alerts" element={<CandidateJobAlertsPage/>}/>
          <Route path="interviews" element={<CandidateInterviewsPage/>}/>
          <Route path="career-programs" element={<CandidateCareerProgramsPage/>}/>
          <Route path="placements" element={<PlacementsPage role="candidate"/>}/>
          <Route path="billing" element={<CandidateBillingPage/>}/>
          <Route path="promotions" element={<PromotionsPage role="candidate"/>}/>
          <Route path="messages" element={<WorkspaceMessagesPage role="candidate"/>}/>
          <Route path="notifications" element={<WorkspaceNotificationsPage role="candidate"/>}/>
          <Route path="safety" element={<SafetyCenterPage role="candidate"/>}/>
          <Route path="settings" element={<CandidateSettingsPage/>}/>
        </Route>

        <Route path="recruiter" element={<MemberLayout role="Recruiter"/>}>
          <Route index element={<RecruiterOverviewPage/>}/>
          <Route path="company" element={<RecruiterCompanyPage/>}/>
          <Route path="jobs" element={<RecruiterJobsPage/>}/>
          <Route path="applicants" element={<RecruiterApplicantsPage/>}/>
          <Route path="candidate-search" element={<RecruiterCandidateSearchPage/>}/>
          <Route path="talent-pools" element={<RecruiterTalentPoolsPage/>}/>
          <Route path="interviews" element={<RecruiterInterviewsPage/>}/>
          <Route path="placements" element={<PlacementsPage role="recruiter"/>}/>
          <Route path="promotions" element={<PromotionsPage role="recruiter"/>}/>
          <Route path="messages" element={<WorkspaceMessagesPage role="recruiter"/>}/>
          <Route path="notifications" element={<WorkspaceNotificationsPage role="recruiter"/>}/>
          <Route path="safety" element={<SafetyCenterPage role="recruiter"/>}/>
          <Route path="settings" element={<RecruiterSettingsPage/>}/>
        </Route>

        <Route path="admin" element={<DashboardLayout role="Admin" loginPath="/admin/login"/>}>
          <Route index element={<AdminOverviewPage/>}/>
          <Route path="recruiters" element={<AdminRecruiterApprovalsPage/>}/>
          <Route path="users" element={<AdminCollectionPage resource="users"/>}/>
          <Route path="companies" element={<AdminCollectionPage resource="companies"/>}/>
          <Route path="jobs" element={<AdminCollectionPage resource="jobs"/>}/>
          <Route path="applications" element={<AdminCollectionPage resource="applications"/>}/>
          <Route path="contacts" element={<AdminCollectionPage resource="contacts"/>}/>
          <Route path="moderation" element={<AdminModerationPage/>}/>
          <Route path="promotions" element={<AdminPromotionsPage/>}/>
          <Route path="career-programs" element={<AdminCareerProgramsPage/>}/>
          <Route path="placements" element={<AdminPlacementsPage/>}/>
          <Route path="billing" element={<AdminBillingPage/>}/>
          <Route path="analytics" element={<AdminAnalyticsPage/>}/>
          <Route path="activity" element={<AdminCollectionPage resource="activity"/>}/>
          <Route path="settings" element={<AdminSettingsPage/>}/>
        </Route>

        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </Suspense>
    <ScrollToTopButton/>
  </>;
}
