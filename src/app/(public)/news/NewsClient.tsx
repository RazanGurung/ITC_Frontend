'use client';

import Link from 'next/link';
import { Button } from '@/components/ui';
import { useTranslation } from '@/context';
import { smarika } from '@/lib/content/council';
import { formatDate } from '@/lib/utils';
import type { Post } from '@/types';

// ============================================
// News Header
// ============================================

export function NewsHeader() {
  const { t } = useTranslation();

  return (
    <section className="page-header">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
            {t.news.title}
          </h1>
          <p className="text-xl text-gray-600">
            {t.news.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================
// News Card Component
// ============================================

export function NewsCard({ post }: { post: Post }) {
  return (
    <article className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-video w-full overflow-hidden">
        {post.featuredImage ? (
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
            <svg className="w-16 h-16 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-6">
        {post.category && (
          <span className="text-sm text-primary-600 font-medium">{post.category.name}</span>
        )}
        <h3 className="text-xl font-semibold text-gray-900 mt-2 mb-3 group-hover:text-primary-600 transition-colors">
          <Link href={`/news/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{formatDate(post.publishedAt || post.createdAt)}</span>
          <div className="flex items-center gap-2">
            {post.author.avatar ? (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-6 h-6 rounded-full"
              />
            ) : (
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-primary-700">
                  {post.author.name.charAt(0)}
                </span>
              </div>
            )}
            <span>{post.author.name}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

// ============================================
// News Empty State
// ============================================

export function NewsEmptyState() {
  const { t } = useTranslation();

  return (
    <div className="text-center py-16 bg-gray-50 rounded-xl">
      <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.news.noNews}</h3>
      <p className="text-gray-500">{t.news.noNewsSubtitle}</p>
    </div>
  );
}

// ============================================
// Publications (Smarika)
// ============================================

export function PublicationsSection() {
  const { language } = useTranslation();
  const en = language === 'en';

  return (
    <section className="section bg-gray-50" id="publications">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">
          {en ? 'Publications' : 'प्रकाशनहरू'}
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl">
          {en
            ? 'Documents published by the council, free to read and download.'
            : 'परिषद्ले प्रकाशन गरेका सामग्रीहरू, पढ्न र डाउनलोड गर्न निःशुल्क।'}
        </p>
        <article className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden md:flex">
          <div className="md:w-64 shrink-0 bg-gray-100 flex items-center justify-center p-6">
            <img
              src={smarika.cover}
              alt={smarika.title}
              className="w-44 md:w-full h-auto rounded shadow-lg"
              loading="lazy"
            />
          </div>
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <span className="text-sm font-medium text-primary-600">
              {en ? 'Smarika · Souvenir Publication' : 'स्मारिका'}
            </span>
            <h3 className="text-2xl font-semibold text-gray-900 mt-2 mb-1">
              {en ? smarika.title : smarika.titleNe}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {smarika.dates} · {smarika.pages} {en ? 'pages' : 'पृष्ठ'} · {en ? 'In Nepali' : 'नेपाली भाषामा'}
            </p>
            <ul className="flex flex-wrap gap-2 mb-6">
              {smarika.contents.map((c) => (
                <li key={c.en} className="text-xs bg-primary-50 text-primary-700 rounded-full px-3 py-1">
                  {en ? c.en : c.ne}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <a href={smarika.file} target="_blank" rel="noopener noreferrer">
                <Button>{en ? 'Read Online' : 'अनलाइन पढ्नुहोस्'}</Button>
              </a>
              <a href={smarika.file} download>
                <Button variant="outline">{en ? 'Download PDF (12 MB)' : 'PDF डाउनलोड (१२ MB)'}</Button>
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
