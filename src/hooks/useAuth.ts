'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';
import {
  getAccessToken,
  getStoredUser,
  handleLogin,
  handleLogout,
  isAuthenticated as checkIsAuthenticated,
} from '@/lib/auth';
import type { User, LoginCredentials, AuthResponse } from '@/types';

// ============================================
// Auth Hook Return Type
// ============================================

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

// ============================================
// useAuth Hook
// ============================================

export function useAuth(): UseAuthReturn {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on mount
  const checkAuth = useCallback(async () => {
    setIsLoading(true);

    const token = getAccessToken();
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    // Try to get user from storage first
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
      setIsLoading(false);
      return;
    }

    // If no stored user, fetch from API
    try {
      const userData = await authApi.me();
      setUser(userData);
    } catch {
      // Token is invalid, clear everything
      await handleLogout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Login function
  const login = async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    try {
      const response: AuthResponse = await authApi.login(credentials);
      await handleLogin(response.tokens, response.user);
      setUser(response.user);
      router.push('/admin/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await authApi.logout();
    } catch {
      // Ignore logout API errors, still clear local state
    } finally {
      await handleLogout();
      setUser(null);
      setIsLoading(false);
      router.push('/admin/login');
    }
  };

  return {
    user,
    isAuthenticated: checkIsAuthenticated() && !!user,
    isLoading,
    login,
    logout,
    checkAuth,
  };
}

export default useAuth;
