import type { Metadata } from 'next';
import { Suspense } from 'react';
import SectionLoader from '@/components/SectionLoader';
import { eventsApi, withTimeout } from '@/lib/api';
import type { Event } from '@/types';
import {
  EventCard,
  EventsHeader,
  EventsEmptyState,
  EventsNewsletter, ConferenceMilestones } from './EventsClient';

// ============================================
// Metadata
// ============================================

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Conferences, seminars, workshops and cultural programs of the International Tamu (Gurung) Council.',
};

// ============================================
// Data Fetching
// ============================================

async function getEvents(): Promise<Event[]> {
  try {
    const response = await withTimeout(eventsApi.getAll({ limit: 12 }));
    return response.data;
  } catch {
    return [];
  }
}

// ============================================
// Events Page
// ============================================

async function EventsGrid() {
  const events = await getEvents();

  return events.length > 0 ? (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  ) : (
    <EventsEmptyState />
  );
}

export default function EventsPage() {
  return (
    <>
      <EventsHeader />

      {/* Events Grid */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<SectionLoader />}>
            <EventsGrid />
          </Suspense>
        </div>
      </section>

      <ConferenceMilestones />

      <EventsNewsletter />
    </>
  );
}
