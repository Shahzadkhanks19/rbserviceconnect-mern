export async function apiRequest(path, options = {}) {
  let response;
  try {
    response = await fetch(`/api${path}`, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  } catch {
    const error = new Error('Unable to reach the RB Service Connect API. Check that the backend server is running.');
    error.status = 0;
    throw error;
  }

  const contentType = response.headers.get('content-type') || '';
  const body = contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    const fallback = response.status >= 500
      ? 'The RB Service Connect API is unavailable or returned an unexpected server response. Check the backend terminal for the exact error.'
      : 'Something went wrong. Please try again.';
    const error = new Error(body?.message || fallback);
    error.status = response.status;
    error.body = body;
    throw error;
  }

  return body;
}
