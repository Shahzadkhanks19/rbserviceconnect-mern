export async function apiRequest(path, options = {}) {
  const response = await fetch(`/api${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const contentType = response.headers.get('content-type') || '';
  const body = contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    const error = new Error(body?.message || 'Something went wrong. Please try again.');
    error.status = response.status;
    error.body = body;
    throw error;
  }

  return body;
}
