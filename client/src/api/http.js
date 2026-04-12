/**
 * JSON API helpers built on the Fetch API (no Axios).
 * Auth-enabled requests attach `Authorization: Bearer <token>` from localStorage.
 */

const base = '';
const TOKEN_KEY = 'eventura_token';

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

function buildHeaders({ auth = false, json = false } = {}) {
  const headers = { Accept: 'application/json' };
  if (json) headers['Content-Type'] = 'application/json';
  if (auth) {
    const token = getStoredToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

async function parseJsonSafe(res) {
  return res.json().catch(() => ({}));
}

export async function apiGet(path, options = {}) {
  const { auth = false } = options;
  const res = await fetch(`${base}${path}`, { headers: buildHeaders({ auth, json: false }) });
  const data = await parseJsonSafe(res);
  if (!res.ok) {
    throw new Error(data.message || res.statusText || 'Request failed');
  }
  return data;
}

export async function apiPost(path, body, options = {}) {
  const { auth = false } = options;
  const res = await fetch(`${base}${path}`, {
    method: 'POST',
    headers: buildHeaders({ auth, json: true }),
    body: JSON.stringify(body ?? {}),
  });
  const data = await parseJsonSafe(res);
  if (!res.ok) {
    throw new Error(data.message || res.statusText || 'Request failed');
  }
  return data;
}

export async function apiPut(path, body, options = {}) {
  const { auth = true } = options;
  const res = await fetch(`${base}${path}`, {
    method: 'PUT',
    headers: buildHeaders({ auth, json: true }),
    body: JSON.stringify(body ?? {}),
  });
  const data = await parseJsonSafe(res);
  if (!res.ok) {
    throw new Error(data.message || res.statusText || 'Request failed');
  }
  return data;
}

export async function apiDelete(path, options = {}) {
  const { auth = true } = options;
  const res = await fetch(`${base}${path}`, {
    method: 'DELETE',
    headers: buildHeaders({ auth, json: false }),
  });
  const data = await parseJsonSafe(res);
  if (!res.ok) {
    throw new Error(data.message || res.statusText || 'Request failed');
  }
  // 204 No Content
  if (res.status === 204) return null;
  return data;
}
