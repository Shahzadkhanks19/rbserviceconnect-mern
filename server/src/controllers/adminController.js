import User from '../models/User.js';
import { brandedEmail, sendEmail } from '../services/emailService.js';

const allowedRecruiterStatuses = ['pending', 'active', 'suspended'];

export async function listRecruiters(req, res) {
  const status = req.query.status;
  const filter = { role: 'recruiter' };

  if (status && allowedRecruiterStatuses.includes(status)) {
    filter.status = status;
  }

  const recruiters = await User.find(filter)
    .select('firstName lastName email role status emailVerified createdAt updatedAt lastLoginAt')
    .sort({ createdAt: -1 });

  return res.json({ recruiters });
}

export async function updateRecruiterStatus(req, res) {
  const { status } = req.body;

  if (!allowedRecruiterStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid recruiter status' });
  }

  const recruiter = await User.findOne({ _id: req.params.id, role: 'recruiter' });

  if (!recruiter) {
    return res.status(404).json({ message: 'Recruiter account not found' });
  }

  const previousStatus = recruiter.status;
  recruiter.status = status;
  await recruiter.save({ validateBeforeSave: false });

  if (status === 'active' && previousStatus !== 'active') {
    const loginUrl = `${process.env.CLIENT_URL}/login`;
    const html = brandedEmail({
      eyebrow: 'Recruiter access',
      title: 'Your recruiter account is approved',
      greeting: `Hello ${recruiter.firstName},`,
      paragraphs: [
        'Your Royalties Service Connect recruiter account has been reviewed and approved.',
        'You can now sign in to your recruiter workspace and continue setting up your employer profile and hiring activity.',
      ],
      buttonLabel: 'Open recruiter workspace',
      buttonUrl: loginUrl,
      note: 'If you were not expecting this account approval, please contact the RB Service Connect team through the website.',
    });
    const text = `Hello ${recruiter.firstName},\n\nYour Royalties Service Connect recruiter account has been approved.\n\nSign in: ${loginUrl}\n\nYou can now access your recruiter workspace.`;

    try {
      await sendEmail({
        to: recruiter.email,
        subject: 'Your RB Service Connect recruiter account is approved',
        html,
        text,
      });
    } catch (error) {
      console.error('Recruiter approval email failed:', error);
    }
  }

  return res.json({
    message: status === 'active' ? 'Recruiter approved successfully' : `Recruiter status changed to ${status}`,
    recruiter: {
      id: recruiter._id,
      firstName: recruiter.firstName,
      lastName: recruiter.lastName,
      email: recruiter.email,
      status: recruiter.status,
      updatedAt: recruiter.updatedAt,
    },
  });
}
