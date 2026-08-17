import LegalPage from '../../components/LegalPage.jsx';

const sections = [
  { title: 'Information we collect', paragraphs: ['RB Service Connect may process account information, candidate profile details, recruiter and company information, job applications, uploaded documents, support enquiries, and platform activity needed to provide recruitment services.'] },
  { title: 'How information is used', paragraphs: ['Information is used to operate accounts, support job discovery and applications, enable recruiter workflows, manage employer verification, improve platform security, respond to support requests, and provide relevant service communications.'] },
  { title: 'Role-based access', paragraphs: ['Candidate, recruiter, and administrator access is separated so users receive functionality and data appropriate to their role and permissions. Recruiter accounts may require approval before access to hiring tools is enabled.'] },
  { title: 'Sharing and service providers', paragraphs: ['Information may be processed by infrastructure, database, email, security, or other service providers where necessary to operate the platform. Candidate information may also be shared with employers when the candidate applies for a role or otherwise chooses to participate in a hiring process.'] },
  { title: 'Data security', paragraphs: ['RB Service Connect uses measures such as password hashing, protected sessions, role-based authorization, request validation, rate limiting, security headers, and restricted administrative access to help protect platform data.'] },
  { title: 'Data retention', paragraphs: ['Information is retained only for as long as reasonably needed for platform operation, recruitment workflows, security, dispute handling, legal obligations, and legitimate business requirements.'] },
  { title: 'Your choices', paragraphs: ['Users may update key account information through available account tools and can contact RB Service Connect regarding access, correction, deletion, or other privacy-related requests where applicable.'] },
  { title: 'Cookies', paragraphs: ['Essential cookies may be used to maintain authenticated sessions. More information is available in the Cookie Policy linked from the website footer.'] },
  { title: 'Policy updates', paragraphs: ['This policy may be updated as platform functionality, service providers, or legal requirements change. The latest version and update date will remain available on this page.'] },
];

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" intro="This policy explains how RB Service Connect handles information used to provide candidate, employer, recruitment, support, and administrative services." sections={sections} />;
}
