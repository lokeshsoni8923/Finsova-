// utils/tokenManager.ts
const ACCESS_KEY = 'finsova_access_token';

export function saveAccessToken(token: string) {
  localStorage.setItem(ACCESS_KEY, token);
}

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_KEY);
}

export function clearAccessToken() {
  localStorage.removeItem(ACCESS_KEY);
}
