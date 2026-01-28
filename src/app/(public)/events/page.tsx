import type { Metadata } from 'next';
import { eventsApi } from '@/lib/api';
import type { Event } from '@/types';
import {
  EventCard,
  EventsHeader,
  EventsEmptyState,
  EventsNewsletter,
} from './EventsClient';

// ============================================
// Metadata
// ============================================

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Discover upcoming cultural events, festivals, and community gatherings hosted by International TAMU Corporation.',
};

// ============================================
// Data Fetching
// ============================================

async function getEvents(): Promise<Event[]> {
  try {
    const response = await eventsApi.getAll({ limit: 12 });
    return response.data;
  } catch {
    return [];
  }
}

// ============================================
// Events Page
// ============================================

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <>
      <EventsHeader />

      {/* Events Grid */}
      <section className="section bg-white">
        <div className="container mx-auto px-4">
          {events.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <EventsEmptyState />
          )}
        </div>
      </section>

      <EventsNewsletter />
    </>
  );
}
