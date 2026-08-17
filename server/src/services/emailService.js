const brand = {
  sage: '#879E83',
  gold: '#E3A341',
  cream: '#F3E8A2',
  ink: '#0F172A',
  muted: '#64748B',
  border: '#E2E8F0',
  surface: '#F8FAFC',
};

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function renderButton(label, href) {
  if (!label || !href) return '';
  return `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:28px 0 8px;"><tr><td style="border-radius:12px;background:${brand.gold};"><a href="${escapeHtml(href)}" style="display:inline-block;padding:14px 22px;font-family:Arial,sans-serif;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:12px;">${escapeHtml(label)}</a></td></tr></table>`;
}

export function brandedEmail({ eyebrow = 'RB Service Connect', title, greeting, paragraphs = [], buttonLabel, buttonUrl, note, footer }) {
  const body = paragraphs.map((paragraph) => `<p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:15px;line-height:1.75;color:${brand.muted};">${escapeHtml(paragraph)}</p>`).join('');
  const noteBlock = note ? `<div style="margin-top:24px;padding:16px 18px;border:1px solid ${brand.border};border-radius:14px;background:${brand.surface};font-family:Arial,sans-serif;font-size:13px;line-height:1.65;color:${brand.muted};">${escapeHtml(note)}</div>` : '';
  const footerText = footer || 'This is a transactional message from Royalties Service Connect.';

  return `<!doctype html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:0;background:#F1F5F9;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#F1F5F9;padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid ${brand.border};">
        <tr><td style="background:${brand.sage};padding:28px 32px;">
          <div style="font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#ffffff;opacity:.86;">${escapeHtml(eyebrow)}</div>
          <div style="margin-top:8px;font-family:Arial,sans-serif;font-size:24px;font-weight:700;line-height:1.25;color:${brand.ink};">Royalties Service Connect</div>
        </td></tr>
        <tr><td style="padding:34px 32px 30px;">
          <div style="display:inline-block;margin-bottom:18px;padding:7px 11px;border-radius:999px;background:${brand.cream};font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:.7px;text-transform:uppercase;color:${brand.ink};">${escapeHtml(eyebrow)}</div>
          <h1 style="margin:0 0 18px;font-family:Arial,sans-serif;font-size:28px;line-height:1.25;color:${brand.ink};">${escapeHtml(title)}</h1>
          ${greeting ? `<p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:15px;line-height:1.75;color:${brand.ink};font-weight:600;">${escapeHtml(greeting)}</p>` : ''}
          ${body}
          ${renderButton(buttonLabel, buttonUrl)}
          ${noteBlock}
        </td></tr>
        <tr><td style="padding:22px 32px;background:${brand.surface};border-top:1px solid ${brand.border};">
          <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;line-height:1.6;color:${brand.muted};">${escapeHtml(footerText)}</p>
          <p style="margin:8px 0 0;font-family:Arial,sans-serif;font-size:11px;line-height:1.6;color:#94A3B8;">© 2026 Royalties Service Connect</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function sendEmail({ to, subject, html, text }) {
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
    if (process.env.NODE_ENV !== 'production') {
      console.info(`Email skipped in development: ${subject} -> ${to}`);
    }
    return { skipped: true };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM,
      to: [to],
      subject,
      html,
      text,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend request failed with status ${response.status}`);
  }

  return response.json();
}
