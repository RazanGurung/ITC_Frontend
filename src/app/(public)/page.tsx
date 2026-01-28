import { eventsApi, postsApi } from '@/lib/api';
import type { Event, Post } from '@/types';
import {
  HeroSection,
  StatsSection,
  MissionSection,
  HeritageSection,
  EventsSection,
  NewsSection,
  CTASection,
} from './HomeClient';

// ============================================
// Metadata
// ============================================

export const metadata = {
  title: 'Home | International TAMU Corporation',
  description:
    'International TAMU Corporation - Preserving our heritage, uniting our community, and building a home away from home.',
};

// ============================================
// Data Fetching
// ============================================

async function getHomeData(): Promise<{ events: Event[]; posts: Post[] }> {
  try {
    const [events, posts] = await Promise.all([
      eventsApi.getUpcoming(3),
      postsApi.getRecent(3),
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

export default async function HomePage() {
  const { events, posts } = await getHomeData();

  return (
    <>
      <HeroSection />
      <StatsSection />
      <MissionSection />
      <HeritageSection />
      <EventsSection events={events} />
      <NewsSection posts={posts} />
      <CTASection />
    </>
  );
}
