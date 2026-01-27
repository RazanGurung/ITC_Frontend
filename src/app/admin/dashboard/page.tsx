'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, Spinner, Badge } from '@/components/ui';
import { dashboardApi } from '@/lib/api';
import type { DashboardStats, ActivityItem } from '@/types';
import { formatRelativeTime } from '@/lib/utils';

// ============================================
// Stat Card Component
// ============================================

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  href: string;
  color: 'primary' | 'secondary' | 'success' | 'warning';
}

function StatCard({ title, value, icon, href, color }: StatCardProps) {
  const colorClasses = {
    primary: 'bg-primary-100 text-primary-600',
    secondary: 'bg-secondary-100 text-secondary-600',
    success: 'bg-green-100 text-green-600',
    warning: 'bg-yellow-100 text-yellow-600',
  };

  return (
    <Link href={href}>
      <Card hover className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          {icon}
        </div>
        <div>
          <p className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
          <p className="text-gray-600">{title}</p>
        </div>
      </Card>
    </Link>
  );
}

// ============================================
// Activity Item Component
// ============================================

function ActivityItemCard({ item }: { item: ActivityItem }) {
  const actionColors = {
    created: 'success',
    updated: 'primary',
    deleted: 'danger',
  } as const;

  const typeIcons = {
    post: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
    event: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    gallery: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    contact: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  };

  return (
    <div className="flex items-start gap-4 py-3">
      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
        {typeIcons[item.type]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-gray-900">
          <span className="font-medium capitalize">{item.type}</span>{' '}
          <Badge variant={actionColors[item.action]} size="sm">
            {item.action}
          </Badge>
        </p>
        <p className="text-gray-600 truncate">{item.title}</p>
        <p className="text-sm text-gray-400 mt-1">
          {item.user?.name && `by ${item.user.name} `}
          {formatRelativeTime(item.timestamp)}
        </p>
      </div>
    </div>
  );
}

// ============================================
// Quick Actions Component
// ============================================

function QuickActions() {
  const actions = [
    { label: 'New Post', href: '/admin/posts/new', icon: '📝' },
    { label: 'New Event', href: '/admin/events/new', icon: '📅' },
    { label: 'Upload Media', href: '/admin/gallery/upload', icon: '📷' },
    { label: 'View Site', href: '/', icon: '🌐' },
  ];

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <span className="text-2xl">{action.icon}</span>
            <span className="font-medium text-gray-700">{action.label}</span>
          </Link>
        ))}
      </div>
    </Card>
  );
}

// ============================================
// Dashboard Page
// ============================================

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await dashboardApi.getStats();
        setStats(data);
      } catch {
        // Use placeholder data if API fails
        setStats({
          totalPosts: 0,
          totalEvents: 0,
          totalGalleryItems: 0,
          totalContacts: 0,
          recentActivity: [],
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here&apos;s what&apos;s happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Posts"
          value={stats?.totalPosts || 0}
          href="/admin/posts"
          color="primary"
          icon={
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          }
        />
        <StatCard
          title="Total Events"
          value={stats?.totalEvents || 0}
          href="/admin/events"
          color="secondary"
          icon={
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />
        <StatCard
          title="Gallery Items"
          value={stats?.totalGalleryItems || 0}
          href="/admin/gallery"
          color="success"
          icon={
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />
        <StatCard
          title="New Contacts"
          value={stats?.totalContacts || 0}
          href="/admin/contacts"
          color="warning"
          icon={
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
        />
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            {stats?.recentActivity && stats.recentActivity.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {stats.recentActivity.map((item) => (
                  <ActivityItemCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                No recent activity
              </div>
            )}
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
