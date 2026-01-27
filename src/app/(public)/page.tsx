import Link from 'next/link';
import { Button, ImageCard } from '@/components/ui';
import { eventsApi, postsApi } from '@/lib/api';
import type { Event, Post } from '@/types';
import { formatDate } from '@/lib/utils';

// ============================================
// Metadata
// ============================================

export const metadata = {
  title: 'Home | International TAMU Corporation',
  description:
    'Welcome to International TAMU Corporation - building bridges across cultures and fostering community spirit.',
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
// Hero Section
// ============================================

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="hero-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="2" fill="currentColor" />
            </pattern>
          </defs>
          <rect fill="url(#hero-pattern)" width="100" height="100" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-20 md:py-32 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 mb-6 animate-fade-in">
            Building Bridges{' '}
            <span className="gradient-text">Across Cultures</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in animation-delay-100">
            International TAMU Corporation is dedicated to fostering community spirit,
            preserving heritage, and creating lasting connections for future generations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-200">
            <Link href="/about">
              <Button size="lg">
                Learn About Us
              </Button>
            </Link>
            <Link href="/events">
              <Button variant="outline" size="lg">
                View Events
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 md:h-24">
          <path d="M0 50L60 45C120 40 240 30 360 35C480 40 600 60 720 65C840 70 960 60 1080 50C1200 40 1320 30 1380 25L1440 20V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

// ============================================
// Stats Section
// ============================================

function StatsSection() {
  const stats = [
    { value: '25+', label: 'Years of Service' },
    { value: '5000+', label: 'Community Members' },
    { value: '100+', label: 'Annual Events' },
    { value: '50+', label: 'Partner Organizations' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                {stat.value}
              </p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// Mission Section
// ============================================

function MissionSection() {
  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Community',
      description: 'Building strong connections within and across diverse communities.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      title: 'Culture',
      description: 'Celebrating and preserving our rich cultural heritage and traditions.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Education',
      description: 'Empowering through cultural education and youth development programs.',
    },
  ];

  return (
    <section className="section bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We are committed to creating a vibrant community that celebrates diversity,
            preserves tradition, and builds bridges across cultures.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// Events Preview Section
// ============================================

function EventsSection({ events }: { events: Event[] }) {
  return (
    <section className="section bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-gray-600 max-w-xl">
              Join us at our upcoming community events and cultural celebrations.
            </p>
          </div>
          <Link href="/events" className="mt-4 md:mt-0">
            <Button variant="outline">View All Events</Button>
          </Link>
        </div>

        {events.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <ImageCard
                key={event.id}
                image={event.featuredImage || '/images/event-placeholder.jpg'}
                alt={event.title}
                title={event.title}
                description={event.description}
                href={`/events/${event.id}`}
                date={formatDate(event.startDate)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-500">No upcoming events at the moment. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================
// News Preview Section
// ============================================

function NewsSection({ posts }: { posts: Post[] }) {
  return (
    <section className="section bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Latest News
            </h2>
            <p className="text-lg text-gray-600 max-w-xl">
              Stay updated with the latest news and stories from our community.
            </p>
          </div>
          <Link href="/news" className="mt-4 md:mt-0">
            <Button variant="outline">View All News</Button>
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <ImageCard
                key={post.id}
                image={post.featuredImage || '/images/news-placeholder.jpg'}
                alt={post.title}
                title={post.title}
                description={post.excerpt}
                href={`/news/${post.slug}`}
                date={formatDate(post.publishedAt || post.createdAt)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-gray-500">No news articles yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================
// CTA Section
// ============================================

function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-700">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
          Join Our Community
        </h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Become a part of our vibrant community. Together, we can make a difference
          and create lasting impact.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/donate">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-primary-700 hover:bg-gray-100"
            >
              Support Our Cause
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              Get In Touch
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
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
      <EventsSection events={events} />
      <NewsSection posts={posts} />
      <CTASection />
    </>
  );
}
