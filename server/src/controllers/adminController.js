import User from '../models/User.js';

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

  recruiter.status = status;
  await recruiter.save({ validateBeforeSave: false });

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
