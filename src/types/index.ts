// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

// ============================================
// Authentication Types
// ============================================

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'user';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

// ============================================
// Post/News Types
// ============================================

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: Pick<User, 'id' | 'name' | 'avatar'>;
  category?: Category;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostFormData {
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  categoryId?: string;
  tags: string[];
  status: 'draft' | 'published';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

// ============================================
// Event Types
// ============================================

export interface Event {
  id: string;
  title: string;
  description: string;
  content: string;
  featuredImage?: string;
  location: string;
  address?: string;
  startDate: string;
  endDate?: string;
  registrationUrl?: string;
  capacity?: number;
  attendees?: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface EventFormData {
  title: string;
  description: string;
  content: string;
  featuredImage?: string;
  location: string;
  address?: string;
  startDate: string;
  endDate?: string;
  registrationUrl?: string;
  capacity?: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

// ============================================
// Gallery Types
// ============================================

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
  youtubeId?: string; // For YouTube embeds
  album?: Album;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryFormData {
  title: string;
  description?: string;
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
  youtubeId?: string;
  albumId?: string;
}

export interface Album {
  id: string;
  name: string;
  slug: string;
  description?: string;
  coverImage?: string;
  itemCount: number;
  createdAt: string;
}

// ============================================
// Contact Form Types
// ============================================

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ContactSubmission extends ContactFormData {
  id: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

// ============================================
// Donation Types (Placeholder for Stripe)
// ============================================

export interface DonationFormData {
  amount: number;
  currency: 'USD' | 'EUR' | 'GBP';
  donorName: string;
  donorEmail: string;
  message?: string;
  isRecurring: boolean;
  frequency?: 'monthly' | 'quarterly' | 'annually';
}

export interface Donation {
  id: string;
  amount: number;
  currency: string;
  donorName: string;
  donorEmail: string;
  message?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  stripePaymentId?: string;
  createdAt: string;
}

// ============================================
// Navigation Types
// ============================================

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  icon?: string;
}

// ============================================
// Dashboard Statistics Types
// ============================================

export interface DashboardStats {
  totalPosts: number;
  totalEvents: number;
  totalGalleryItems: number;
  totalContacts: number;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'post' | 'event' | 'gallery' | 'contact';
  action: 'created' | 'updated' | 'deleted';
  title: string;
  timestamp: string;
  user?: Pick<User, 'id' | 'name'>;
}
