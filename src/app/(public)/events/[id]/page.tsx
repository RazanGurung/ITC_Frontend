import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button, Badge } from '@/components/ui';
import { eventsApi } from '@/lib/api';
import type { Event } from '@/types';
import { formatDate, formatDateTime } from '@/lib/utils';

// ============================================
// Types
// ============================================

interface EventPageProps {
  params: Promise<{ id: string }>;
}

// ============================================
// Data Fetching
// ============================================

async function getEvent(id: string): Promise<Event | null> {
  try {
    return await eventsApi.getById(id);
  } catch {
    return null;
  }
}

// ============================================
// Metadata
// ============================================

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) {
    return { title: 'Event Not Found' };
  }

  return {
    title: event.title,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      images: event.featuredImage ? [event.featuredImage] : undefined,
    },
  };
}

// ============================================
// Event Details Page
// ============================================

export default async function EventDetailsPage({ params }: EventPageProps) {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) {
    notFound();
  }

  const statusColors = {
    upcoming: 'primary',
    ongoing: 'success',
    completed: 'default',
    cancelled: 'danger',
  } as const;

  return (
    <>
      {/* Header */}
      <section className="page-header">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Events
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant={statusColors[event.status]} size="lg">
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </Badge>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6">
            {event.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDateTime(event.startDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{event.location}</span>
            </div>
            {event.capacity && (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>{event.attendees || 0} / {event.capacity} spots</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {event.featuredImage && (
                <div className="aspect-video rounded-xl overflow-hidden mb-8">
                  <img
                    src={event.featuredImage}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="prose-content">
                <h2>About This Event</h2>
                <p>{event.description}</p>

                <div
                  className="mt-6"
                  dangerouslySetInnerHTML={{ __html: event.content }}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h3>

                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-gray-500">Date & Time</dt>
                    <dd className="font-medium text-gray-900 mt-1">
                      {formatDateTime(event.startDate)}
                      {event.endDate && (
                        <>
                          <br />
                          <span className="text-sm text-gray-500">to</span>
                          <br />
                          {formatDateTime(event.endDate)}
                        </>
                      )}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm text-gray-500">Location</dt>
                    <dd className="font-medium text-gray-900 mt-1">
                      {event.location}
                      {event.address && (
                        <span className="block text-sm text-gray-500 mt-1">
                          {event.address}
                        </span>
                      )}
                    </dd>
                  </div>

                  {event.capacity && (
                    <div>
                      <dt className="text-sm text-gray-500">Capacity</dt>
                      <dd className="font-medium text-gray-900 mt-1">
                        {event.attendees || 0} / {event.capacity} registered
                      </dd>
                    </div>
                  )}
                </dl>

                {event.status === 'upcoming' && event.registrationUrl && (
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-6"
                  >
                    <Button fullWidth size="lg">
                      Register Now
                    </Button>
                  </a>
                )}

                {event.status === 'upcoming' && !event.registrationUrl && (
                  <Link href="/contact" className="block mt-6">
                    <Button fullWidth size="lg">
                      Contact for Registration
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
