import User from '../models/User.js';

export async function getEmployerOverview(_req, res) {
  const [activeRecruiters, totalRecruiters] = await Promise.all([
    User.countDocuments({ role: 'recruiter', status: 'active' }),
    User.countDocuments({ role: 'recruiter' }),
  ]);

  return res.json({
    activeEmployerAccounts: activeRecruiters,
    registeredEmployerAccounts: totalRecruiters,
    approvalRequired: true,
    recruiterRegistrationOpen: true,
  });
}
