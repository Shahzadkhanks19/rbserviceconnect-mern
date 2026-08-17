import User from '../models/User.js';

export async function ensureAdminAccount() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const firstName = process.env.ADMIN_FIRST_NAME?.trim() || 'RB';
  const lastName = process.env.ADMIN_LAST_NAME?.trim() || 'Admin';

  if (!email || !password) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Admin bootstrap skipped: ADMIN_EMAIL and ADMIN_PASSWORD are not configured.');
    }
    return;
  }

  if (password.length < 12) {
    throw new Error('ADMIN_PASSWORD must be at least 12 characters');
  }

  const existing = await User.findOne({ email }).select('+password');

  if (!existing) {
    await User.create({
      firstName,
      lastName,
      email,
      password,
      role: 'admin',
      status: 'active',
      emailVerified: true,
    });
    console.log(`Admin account created for ${email}`);
    return;
  }

  let changed = false;

  if (existing.role !== 'admin') {
    existing.role = 'admin';
    changed = true;
  }
  if (existing.status !== 'active') {
    existing.status = 'active';
    changed = true;
  }
  if (!existing.emailVerified) {
    existing.emailVerified = true;
    changed = true;
  }

  if (process.env.ADMIN_SYNC_PASSWORD === 'true') {
    existing.password = password;
    changed = true;
  }

  if (changed) {
    await existing.save();
  }
}
