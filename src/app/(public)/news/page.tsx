import type { Metadata } from 'next';
import { Suspense } from 'react';
import SectionLoader from '@/components/SectionLoader';
import { postsApi, withTimeout } from '@/lib/api';
import type { Post } from '@/types';
import { NewsHeader, NewsCard, NewsEmptyState, PublicationsSection } from './NewsClient';

// ============================================
// Metadata
// ============================================

export const metadata: Metadata = {
  title: 'News & Updates',
  description:
    'Stay updated with the latest news, stories, and announcements from International Tamu (Gurung) Council.',
};

// ============================================
// Data Fetching
// ============================================

async function getPosts(): Promise<Post[]> {
  try {
    const response = await withTimeout(postsApi.getAll({ limit: 12 }));
    return response.data;
  } catch {
    return [];
  }
}

// ============================================
// News Page
// ============================================

async function NewsGrid() {
  const posts = await getPosts();

  return posts.length > 0 ? (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <NewsCard key={post.id} post={post} />
      ))}
    </div>
  ) : (
    <NewsEmptyState />
  );
}

export default function NewsPage() {
  return (
    <>
      <NewsHeader />

      {/* News Grid */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<SectionLoader />}>
            <NewsGrid />
          </Suspense>
        </div>
      </section>

      <PublicationsSection />
    </>
  );
}
