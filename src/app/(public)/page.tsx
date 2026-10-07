import { Suspense } from 'react';
import SectionLoader from '@/components/SectionLoader';
import { eventsApi, postsApi, withTimeout } from '@/lib/api';
import type { Event, Post } from '@/types';
import {
  HeroSection,
  StatsSection,
  MissionSection,
  HeritageSection,
  LeadershipSection,
  ConferenceSection,
  EventsSection,
  NewsSection,
  CTASection,
} from './HomeClient';

// ============================================
// Metadata
// ============================================

export const metadata = {
  title: 'Home | International Tamu (Gurung) Council',
  description:
    'International Tamu (Gurung) Council - Preserving our heritage, uniting our community, and building a home away from home.',
};

// ============================================
// Data Fetching
// ============================================

async function getHomeData(): Promise<{ events: Event[]; posts: Post[] }> {
  try {
    const [events, posts] = await Promise.all([
      withTimeout(eventsApi.getUpcoming(3)),
      withTimeout(postsApi.getRecent(3)),
    ]);
    return { events, posts };
  } catch {
    // Return empty arrays if API fails (for initial development)
    return { events: [], posts: [] };
  }
}

// ============================================
// Home Page
// ============================================

async function EventsAndNews() {
  const { events, posts } = await getHomeData();

  return (
    <>
      <EventsSection events={events} />
      <NewsSection posts={posts} />
    </>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <MissionSection />
      <HeritageSection />
      <LeadershipSection />
      <ConferenceSection />
      <Suspense fallback={<SectionLoader className="py-32 bg-gray-50" />}>
        <EventsAndNews />
      </Suspense>
      <CTASection />
    </>
  );
}
