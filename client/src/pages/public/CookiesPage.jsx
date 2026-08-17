import LegalPage from '../../components/LegalPage.jsx';

const sections = [
  { title: 'What cookies are', paragraphs: ['Cookies and similar browser technologies can store small pieces of information that help websites remember sessions, preferences, and security-related state.'] },
  { title: 'Essential cookies', paragraphs: ['RB Service Connect uses an authentication cookie when a user signs in. This cookie is required to maintain a secure session and provide access to the correct candidate, recruiter, or administrator workspace.'] },
  { title: 'Preferences and analytics', paragraphs: ['If optional preference or analytics technologies are introduced, this policy will be updated to describe their purpose, duration, and available controls before they are used in production.'] },
  { title: 'Managing cookies', paragraphs: ['Browsers allow users to block or remove cookies. Disabling essential authentication cookies may prevent sign-in and other account features from working correctly.'] },
  { title: 'Changes to this policy', paragraphs: ['This policy may be updated when platform functionality, vendors, or legal requirements change. The latest version will remain available from the website footer.'] },
];

export default function CookiesPage() {
  return <LegalPage title="Cookie Policy" intro="This policy explains how RB Service Connect uses cookies and similar technologies to support secure account sessions and website functionality." sections={sections} />;
}
