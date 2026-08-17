import LegalPage from '../../components/LegalPage.jsx';

const sections = [
  { title: 'Using the platform', paragraphs: ['RB Service Connect provides recruitment-related services for candidates, recruiters, employers, and authorized administrators. Users are responsible for providing accurate account information and using the platform only for legitimate recruitment activity.'] },
  { title: 'Candidate responsibilities', bullets: ['Keep profile and application information accurate.', 'Do not impersonate another person or submit misleading credentials.', 'Use employer and job information only for legitimate career purposes.'] },
  { title: 'Recruiter and employer responsibilities', bullets: ['Post genuine roles with accurate descriptions and hiring terms.', 'Use candidate information only for legitimate recruitment purposes.', 'Do not request prohibited fees, payments, or sensitive information unrelated to recruitment.', 'Maintain authorized access to employer accounts and company information.'] },
  { title: 'Account access and moderation', paragraphs: ['RB Service Connect may review, restrict, suspend, or remove accounts or content where necessary to protect users, enforce platform rules, address misuse, or meet legal obligations. Recruiter access may require approval before hiring tools are activated.'] },
  { title: 'Job listings and hiring outcomes', paragraphs: ['RB Service Connect provides tools that connect candidates and employers but does not guarantee interviews, offers, hires, candidate availability, or the accuracy of information supplied by third parties. Users should independently evaluate opportunities and hiring decisions.'] },
  { title: 'Intellectual property', paragraphs: ['The platform interface, branding, software, and original service content are protected by applicable intellectual-property rights. Users retain ownership of content they submit but grant the permissions reasonably required to operate the service.'] },
  { title: 'Acceptable use', paragraphs: ['Users must not attempt unauthorized access, interfere with platform operation, scrape or misuse personal data, distribute malicious code, conduct fraud, or use the service in a way that harms other users or violates applicable law.'] },
  { title: 'Service changes and availability', paragraphs: ['Features may evolve as the platform develops. RB Service Connect may update, suspend, or discontinue parts of the service when reasonably necessary for maintenance, security, compliance, or product improvement.'] },
  { title: 'Limitation and contact', paragraphs: ['To the extent permitted by applicable law, the service is provided without guarantees beyond those expressly stated. Questions about these terms or platform use can be submitted through the Contact page.'] },
];

export default function TermsPage() {
  return <LegalPage title="Terms & Conditions" intro="These terms describe the rules for using RB Service Connect and the responsibilities that apply to candidates, recruiters, employers, and other users of the platform." sections={sections} />;
}
