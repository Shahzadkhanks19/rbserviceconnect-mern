const base = String(process.env.API_BASE_URL || 'http://localhost:5000/api').replace(/\/$/, '');

const checks = [
  { method: 'GET', path: '/health', expected: [200], label: 'API health' },
  { method: 'GET', path: '/public/jobs', expected: [200], label: 'Public jobs' },
  { method: 'GET', path: '/public/jobs/stats', expected: [200], label: 'Public job stats' },
  { method: 'GET', path: '/public/companies', expected: [200], label: 'Public companies' },
  { method: 'GET', path: '/public/employers/overview', expected: [200], label: 'Employer overview' },
  { method: 'GET', path: '/auth/me', expected: [401], label: 'Auth protection' },
  { method: 'GET', path: '/candidate/overview', expected: [401], label: 'Candidate protection' },
  { method: 'GET', path: '/recruiter/overview', expected: [401], label: 'Recruiter protection' },
  { method: 'GET', path: '/admin/dashboard', expected: [401], label: 'Admin protection' },
];

const failures = [];

for (const check of checks) {
  const url = `${base}${check.path}`;
  try {
    const response = await fetch(url, {
      method: check.method,
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(8000),
    });
    if (!check.expected.includes(response.status)) {
      let detail = '';
      try {
        const body = await response.json();
        detail = body?.message ? ` — ${body.message}` : '';
      } catch {
        // The status is enough when a non-JSON response is returned.
      }
      failures.push(`${check.label}: expected ${check.expected.join(' or ')}, received ${response.status}${detail}`);
    } else {
      console.log(`✓ ${check.label}: ${response.status}`);
    }
  } catch (error) {
    failures.push(`${check.label}: could not reach ${url} (${error.message})`);
  }
}

if (failures.length) {
  console.error(`Live API smoke test failed against ${base}:\n${failures.map((item) => `- ${item}`).join('\n')}`);
  process.exit(1);
}

console.log(`Live API smoke test passed against ${base}. Public reads and role protection are responding correctly.`);
console.log('Note: destructive/payment/email flows are intentionally not executed by this smoke test; those require isolated seeded test accounts and sandbox providers.');
