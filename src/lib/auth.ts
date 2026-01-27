import type { AuthTokens, User } from '@/types';

// ============================================
// Token Storage Keys
// ============================================

const ACCESS_TOKEN_KEY = 'itc_access_token';
const REFRESH_TOKEN_KEY = 'itc_refresh_token';
const USER_KEY = 'itc_user';

// ============================================
// Token Management
// ============================================

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setTokens(tokens: AuthTokens): void {
  if (typeof window === 'undefined') return;

  localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  if (tokens.refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  }
}

export function clearTokens(): void {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

// ============================================
// User Management
// ============================================

export function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null;

  const userJson = localStorage.getItem(USER_KEY);
  if (!userJson) return null;

  try {
    return JSON.parse(userJson) as User;
  } catch {
    return null;
  }
}

export function setStoredUser(user: User): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearStoredUser(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(USER_KEY);
}

// ============================================
// Authentication Helpers
// ============================================

export function isAuthenticated(): boolean {
  return !!getAccessToken();
}

export function isAdmin(): boolean {
  const user = getStoredUser();
  return user?.role === 'admin';
}

export function hasPermission(requiredRole: 'admin' | 'editor' | 'user'): boolean {
  const user = getStoredUser();
  if (!user) return false;

  const roleHierarchy = { admin: 3, editor: 2, user: 1 };
  return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
}

// ============================================
// Cookie-based Token Storage (for SSR/Middleware)
// ============================================

export function setTokenCookie(token: string): void {
  if (typeof document === 'undefined') return;

  // Set HTTP-only cookie for middleware access
  // Note: In production, this should be set by the backend with proper security flags
  const maxAge = 60 * 60 * 24 * 7; // 7 days
  document.cookie = `${ACCESS_TOKEN_KEY}=${token}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function clearTokenCookie(): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${ACCESS_TOKEN_KEY}=; path=/; max-age=0`;
}

export function getTokenFromCookie(cookieString: string | undefined): string | null {
  if (!cookieString) return null;

  const cookies = cookieString.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  return cookies[ACCESS_TOKEN_KEY] || null;
}

// ============================================
// Login/Logout Utilities
// ============================================

export async function handleLogin(tokens: AuthTokens, user: User): Promise<void> {
  setTokens(tokens);
  setStoredUser(user);
  setTokenCookie(tokens.accessToken);
}

export async function handleLogout(): Promise<void> {
  clearTokens();
  clearStoredUser();
  clearTokenCookie();
}
