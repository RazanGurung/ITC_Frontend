import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import type {
  ApiError,
  ApiResponse,
  PaginatedResponse,
  Post,
  Event,
  GalleryItem,
  Album,
  ContactFormData,
  DashboardStats,
  LoginCredentials,
  AuthResponse,
  PostFormData,
  EventFormData,
  GalleryFormData,
} from '@/types';
import { getAccessToken, clearTokens } from './auth';

// ============================================
// API Client Configuration
// ============================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.itc.org';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - adds auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handles errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    // Handle 401 Unauthorized - clear tokens and redirect to login
    if (error.response?.status === 401) {
      clearTokens();
      if (typeof window !== 'undefined') {
        window.location.href = '/admin/login';
      }
    }

    // Format error for consistent handling
    const apiError: ApiError = {
      message: error.response?.data?.message || error.message || 'An error occurred',
      statusCode: error.response?.status || 500,
      error: error.response?.data?.error,
    };

    return Promise.reject(apiError);
  }
);

// ============================================
// Generic Request Functions
// ============================================

async function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.get<T>(url, config);
  return response.data;
}

async function post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.post<T>(url, data, config);
  return response.data;
}

async function put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.put<T>(url, data, config);
  return response.data;
}

async function del<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.delete<T>(url, config);
  return response.data;
}

// ============================================
// Authentication API
// ============================================

export const authApi = {
  login: (credentials: LoginCredentials) =>
    post<AuthResponse>('/auth/login', credentials),

  logout: () =>
    post<void>('/auth/logout'),

  refreshToken: (refreshToken: string) =>
    post<{ accessToken: string }>('/auth/refresh', { refreshToken }),

  me: () =>
    get<AuthResponse['user']>('/auth/me'),
};

// ============================================
// Posts/News API
// ============================================

export const postsApi = {
  // Public endpoints
  getAll: (params?: { page?: number; limit?: number; category?: string }) =>
    get<PaginatedResponse<Post>>('/posts', { params }),

  getBySlug: (slug: string) =>
    get<Post>(`/posts/${slug}`),

  getRecent: (limit = 5) =>
    get<Post[]>('/posts/recent', { params: { limit } }),

  // Admin endpoints
  create: (data: PostFormData) =>
    post<Post>('/admin/posts', data),

  update: (id: string, data: Partial<PostFormData>) =>
    put<Post>(`/admin/posts/${id}`, data),

  delete: (id: string) =>
    del<void>(`/admin/posts/${id}`),

  getAllAdmin: (params?: { page?: number; limit?: number; status?: string }) =>
    get<PaginatedResponse<Post>>('/admin/posts', { params }),
};

// ============================================
// Events API
// ============================================

export const eventsApi = {
  // Public endpoints
  getAll: (params?: { page?: number; limit?: number; status?: string }) =>
    get<PaginatedResponse<Event>>('/events', { params }),

  getById: (id: string) =>
    get<Event>(`/events/${id}`),

  getUpcoming: (limit = 5) =>
    get<Event[]>('/events/upcoming', { params: { limit } }),

  // Admin endpoints
  create: (data: EventFormData) =>
    post<Event>('/admin/events', data),

  update: (id: string, data: Partial<EventFormData>) =>
    put<Event>(`/admin/events/${id}`, data),

  delete: (id: string) =>
    del<void>(`/admin/events/${id}`),

  getAllAdmin: (params?: { page?: number; limit?: number }) =>
    get<PaginatedResponse<Event>>('/admin/events', { params }),
};

// ============================================
// Gallery API
// ============================================

export const galleryApi = {
  // Public endpoints
  getAll: (params?: { page?: number; limit?: number; type?: 'image' | 'video'; albumId?: string }) =>
    get<PaginatedResponse<GalleryItem>>('/gallery', { params }),

  getById: (id: string) =>
    get<GalleryItem>(`/gallery/${id}`),

  getAlbums: () =>
    get<Album[]>('/gallery/albums'),

  getAlbumBySlug: (slug: string) =>
    get<Album & { items: GalleryItem[] }>(`/gallery/albums/${slug}`),

  // Admin endpoints
  create: (data: GalleryFormData) =>
    post<GalleryItem>('/admin/gallery', data),

  update: (id: string, data: Partial<GalleryFormData>) =>
    put<GalleryItem>(`/admin/gallery/${id}`, data),

  delete: (id: string) =>
    del<void>(`/admin/gallery/${id}`),

  createAlbum: (data: { name: string; description?: string; coverImage?: string }) =>
    post<Album>('/admin/gallery/albums', data),

  deleteAlbum: (id: string) =>
    del<void>(`/admin/gallery/albums/${id}`),
};

// ============================================
// Contact API
// ============================================

export const contactApi = {
  submit: (data: ContactFormData) =>
    post<{ message: string }>('/contact', data),

  // Admin endpoints
  getAll: (params?: { page?: number; limit?: number; status?: string }) =>
    get<PaginatedResponse<ContactFormData & { id: string; createdAt: string }>>('/admin/contacts', { params }),

  markAsRead: (id: string) =>
    put<void>(`/admin/contacts/${id}/read`),

  delete: (id: string) =>
    del<void>(`/admin/contacts/${id}`),
};

// ============================================
// Dashboard API
// ============================================

export const dashboardApi = {
  getStats: () =>
    get<DashboardStats>('/admin/dashboard/stats'),
};

// ============================================
// File Upload API
// ============================================

export const uploadApi = {
  uploadImage: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<{ url: string }>('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },
};

// Export the base client for custom requests
export { apiClient };
