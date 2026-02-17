let refreshPromise = null;

async function refreshSession() {
  if (!refreshPromise) {
    refreshPromise = fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    }).finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

export async function authFetch(input, init = {}, options = {}) {
  const { retryOnAuthError = true } = options;

  const response = await fetch(input, {
    ...init,
    credentials: 'include',
  });

  if (!retryOnAuthError || (response.status !== 401 && response.status !== 403)) {
    return response;
  }

  const refreshResponse = await refreshSession();
  if (!refreshResponse.ok) {
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return response;
  }

  return fetch(input, {
    ...init,
    credentials: 'include',
  });
}
