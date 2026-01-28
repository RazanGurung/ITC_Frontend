'use client';

import { Badge } from '@/components/ui';
import { useTranslation } from '@/context';
import { formatDate } from '@/lib/utils';
import type { Event } from '@/types';

// ============================================
// Event Card Component
// ============================================

export function EventCard({ event }: { event: Event }) {
  const { t } = useTranslation();

  const statusColors = {
    upcoming: 'primary',
    ongoing: 'success',
    completed: 'default',
    cancelled: 'danger',
  } as const;

  const statusLabels = {
    upcoming: t.events.status.upcoming,
    ongoing: t.events.status.ongoing,
    completed: t.events.status.completed,
    cancelled: t.events.status.cancelled,
  };

  return (
    <article className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-video w-full overflow-hidden relative">
        <div className="absolute top-3 left-3 z-10">
          <Badge variant={statusColors[event.status]} size="sm">
            {statusLabels[event.status]}
          </Badge>
        </div>
        {event.featuredImage ? (
          <img
            src={event.featuredImage}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
            <svg className="w-16 h-16 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{formatDate(event.startDate)}</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
          <a href={`/events/${event.id}`} className="hover:underline">
            {event.title}
          </a>
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{event.location}</span>
        </div>
      </div>
    </article>
  );
}

// ============================================
// Events Page Header
// ============================================

export function EventsHeader() {
  const { t } = useTranslation();

  return (
    <section className="page-header">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
            {t.events.title}
          </h1>
          <p className="text-xl text-gray-600">
            {t.events.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================
// Events Empty State
// ============================================

export function EventsEmptyState() {
  const { t } = useTranslation();

  return (
    <div className="text-center py-16 bg-gray-50 rounded-xl">
      <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.events.noEvents}</h3>
      <p className="text-gray-500">{t.events.noEventsSubtitle}</p>
    </div>
  );
}

// ============================================
// Newsletter Section
// ============================================

export function EventsNewsletter() {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
            {t.events.newsletter.title}
          </h2>
          <p className="text-gray-600 mb-6">
            {t.events.newsletter.subtitle}
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t.events.newsletter.placeholder}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              {t.events.newsletter.button}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
