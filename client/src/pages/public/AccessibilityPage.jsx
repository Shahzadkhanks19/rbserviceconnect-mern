import LegalPage from '../../components/LegalPage.jsx';

const sections = [
  { title: 'Our approach', paragraphs: ['RB Service Connect is designed to support keyboard navigation, readable contrast, clear form labels, responsive layouts, meaningful focus states, and semantic interface structure across public and authenticated experiences.'] },
  { title: 'Keyboard and focus', paragraphs: ['Interactive controls should remain reachable and understandable without requiring a mouse. Focus indicators are kept visible so users can follow where they are on the page.'] },
  { title: 'Forms and feedback', paragraphs: ['Forms use associated labels and clear status or error messaging. Validation should communicate what needs attention without relying on color alone.'] },
  { title: 'Responsive and readable content', paragraphs: ['Layouts are designed to adapt across desktop, tablet, and mobile widths while preserving readable text sizes, spacing, and usable controls.'] },
  { title: 'Ongoing improvement', paragraphs: ['Accessibility is treated as an ongoing quality requirement. As new recruitment workflows and dashboards are added, they should follow the same accessibility expectations and be reviewed for regressions.'] },
  { title: 'Report an accessibility issue', paragraphs: ['If you encounter an accessibility barrier while using RB Service Connect, please use the Contact page and select the most relevant support topic so the issue can be reviewed.'] },
];

export default function AccessibilityPage() {
  return <LegalPage eyebrow="Accessibility" title="Accessibility Statement" intro="RB Service Connect aims to provide a recruitment experience that is usable by as many people as possible across devices, input methods, and assistive technologies." sections={sections} />;
}
