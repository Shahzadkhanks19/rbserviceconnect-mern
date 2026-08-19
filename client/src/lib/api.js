export async function apiRequest(path, options = {}) {
  let response;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  let body = options.body;
  const contentType = String(headers['Content-Type'] || headers['content-type'] || '');
  if (
    body != null
    && contentType.includes('application/json')
    && typeof body !== 'string'
    && !(body instanceof Blob)
    && !(body instanceof FormData)
  ) {
    body = JSON.stringify(body);
  }

  try {
    response = await fetch(`/api${path}`, {
      ...options,
      body,
      credentials: 'include',
      headers,
    });
  } catch {
    const error = new Error('Unable to reach the RB Service Connect API. Check that the backend server is running.');
    error.status = 0;
    throw error;
  }

  const responseContentType = response.headers.get('content-type') || '';
  const responseBody = responseContentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    const fallback = response.status >= 500
      ? 'The RB Service Connect API is unavailable or returned an unexpected server response. Check the backend terminal for the exact error.'
      : 'Something went wrong. Please try again.';
    const error = new Error(responseBody?.message || fallback);
    error.status = response.status;
    error.body = responseBody;
    throw error;
  }

  return responseBody;
}
