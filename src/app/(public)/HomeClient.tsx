'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, ImageCard } from '@/components/ui';
import { useTranslation } from '@/context';
import { formatDate } from '@/lib/utils';
import type { Event, Post } from '@/types';

// ============================================
// Hero Section with Image Slideshow
// ============================================

const heroImages = [
  {
    src: '/images/gallery/1.jpg',
    alt: 'Cultural celebration',
  },
  {
    src: '/images/gallery/2.jpg',
    alt: 'Himalayan homeland',
  },
  {
    src: '/images/gallery/3.jpg',
    alt: 'Traditional lifestyle',
  },
];

export function HeroSection() {
  const { t, language } = useTranslation();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Images with Crossfade */}
      {heroImages.map((image, index) => (
        <div
          key={image.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
      ))}

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6 border border-white/20">
            {language === 'en' ? '🏔️ Preserving Our Heritage' : '🏔️ हाम्रो सम्पदा संरक्षण'}
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            {language === 'en' ? (
              <>
                Where <span className="text-primary-300">Culture</span> Lives On,<br />
                And <span className="text-primary-300">Community</span> Comes Together
              </>
            ) : (
              <>
                जहाँ <span className="text-primary-300">संस्कृति</span> जीवित छ,<br />
                र <span className="text-primary-300">समुदाय</span> एक हुन्छ
              </>
            )}
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
            {language === 'en'
              ? "No matter how far we are from the mountains, we carry our heritage in our hearts. Join us in celebrating our traditions, preserving our culture, and building a home away from home."
              : "हामी पहाडबाट जतिसुकै टाढा भए पनि, हाम्रो सम्पदा हाम्रो मुटुमा छ। हाम्रो परम्परा मनाउन, हाम्रो संस्कृति संरक्षण गर्न, र घरबाट टाढा एउटा घर बनाउन हामीसँग सामेल हुनुहोस्।"
            }
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/about">
              <Button size="lg" className="bg-primary-600 hover:bg-primary-700 text-white px-8">
                {language === 'en' ? 'Join Our Family' : 'हाम्रो परिवारमा सामेल हुनुहोस्'}
              </Button>
            </Link>
            <Link href="/events">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 px-8"
              >
                {language === 'en' ? 'Upcoming Gatherings' : 'आगामी भेलाहरू'}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentImage
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-10 hidden md:block">
        <div className="flex flex-col items-center text-white/70">
          <span className="text-xs mb-2 rotate-90 origin-center translate-y-4">Scroll</span>
          <div className="w-px h-12 bg-white/30 animate-pulse" />
        </div>
      </div>
    </section>
  );
}

// ============================================
// Stats Section - Community Impact
// ============================================

export function StatsSection() {
  const { language } = useTranslation();

  const stats = [
    {
      value: '500+',
      label: language === 'en' ? 'Families United' : 'परिवारहरू एकजुट',
    },
    {
      value: '25+',
      label: language === 'en' ? 'Years Together' : 'वर्षको साथ',
    },
    {
      value: '50+',
      label: language === 'en' ? 'Events Yearly' : 'वार्षिक कार्यक्रम',
    },
    {
      value: '1000+',
      label: language === 'en' ? 'Youth Engaged' : 'युवा संलग्न',
    },
  ];

  return (
    <section className="py-6 bg-primary-50 border-y border-primary-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className="flex items-center gap-3 px-4">
              <span className="text-2xl md:text-3xl font-bold text-primary-600">
                {stat.value}
              </span>
              <span className="text-sm text-gray-600">{stat.label}</span>
              {index < stats.length - 1 && (
                <span className="hidden md:block w-px h-8 bg-primary-200 ml-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// Mission Section - Heritage Focus
// ============================================

export function MissionSection() {
  const { language } = useTranslation();

  const values = [
    {
      icon: '🏔️',
      title: language === 'en' ? 'Preserve Heritage' : 'सम्पदा संरक्षण',
      description: language === 'en'
        ? 'Keeping our ancestral traditions, language, and customs alive for future generations.'
        : 'आउने पुस्ताका लागि हाम्रो पुर्खाका परम्परा, भाषा र रीतिरिवाज जीवित राख्दै।',
    },
    {
      icon: '🤝',
      title: language === 'en' ? 'Unite Community' : 'समुदाय एकता',
      description: language === 'en'
        ? 'Creating a home away from home where families come together to celebrate and support each other.'
        : 'घरबाट टाढा एउटा घर बनाउँदै जहाँ परिवारहरू एकसाथ मनाउन र एकअर्कालाई सहयोग गर्न आउँछन्।',
    },
    {
      icon: '👶',
      title: language === 'en' ? 'Empower Youth' : 'युवा सशक्तिकरण',
      description: language === 'en'
        ? 'Teaching our children the beauty of their roots through cultural programs and language classes.'
        : 'सांस्कृतिक कार्यक्रम र भाषा कक्षाहरू मार्फत हाम्रा बालबालिकालाई उनीहरूको जराको सुन्दरता सिकाउँदै।',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary-600 font-medium text-sm uppercase tracking-wider">
            {language === 'en' ? 'What We Stand For' : 'हामी के को लागि उभिन्छौं'}
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mt-3 mb-4">
            {language === 'en' ? 'Our Roots, Our Pride' : 'हाम्रो जरा, हाम्रो गौरव'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'en'
              ? 'We are more than an organization. We are a family bound by shared heritage, traditions, and the love for our culture.'
              : 'हामी एक संस्था भन्दा बढी छौं। हामी साझा सम्पदा, परम्परा, र हाम्रो संस्कृतिको मायाले बाँधिएको परिवार हौं।'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow text-center group"
            >
              <span className="text-5xl mb-6 block group-hover:scale-110 transition-transform">
                {value.icon}
              </span>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// Heritage Gallery Preview
// ============================================

export function HeritageSection() {
  const { language } = useTranslation();

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Images Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="/images/gallery/1.jpg"
                alt="Cultural celebration"
                className="w-full h-48 object-cover rounded-2xl shadow-lg"
              />
              <img
                src="/images/gallery/3.jpg"
                alt="Traditional lifestyle"
                className="w-full h-64 object-cover rounded-2xl shadow-lg"
              />
            </div>
            <div className="space-y-4 pt-8">
              <img
                src="/images/gallery/2.jpg"
                alt="Himalayan homeland"
                className="w-full h-64 object-cover rounded-2xl shadow-lg"
              />
              <div className="w-full h-48 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-2xl flex items-center justify-center text-white p-6 text-center">
                <div>
                  <p className="text-3xl font-bold mb-2">25+</p>
                  <p className="text-sm opacity-90">
                    {language === 'en' ? 'Years of Memories' : 'वर्षको सम्झनाहरू'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-primary-600 font-medium text-sm uppercase tracking-wider">
              {language === 'en' ? 'Our Journey' : 'हाम्रो यात्रा'}
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mt-3 mb-6">
              {language === 'en'
                ? 'From the Mountains to Your Hearts'
                : 'पहाडबाट तपाईंको मुटुसम्म'}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {language === 'en'
                ? "For over two decades, we've been the gathering place for our community. From celebrating Lhosar to teaching our children traditional dances, every moment strengthens our bond."
                : "दुई दशकभन्दा बढी समयदेखि, हामी हाम्रो समुदायको भेटघाटको ठाउँ भएका छौं। ल्होसार मनाउनेदेखि हाम्रा बालबालिकालाई परम्परागत नृत्य सिकाउनेसम्म, हरेक क्षणले हाम्रो बन्धनलाई बलियो बनाउँछ।"}
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {language === 'en'
                ? "Whether you're newly arrived or have been here for generations, you're family. Come join us, share stories, and keep our beautiful traditions alive together."
                : "तपाईं भर्खरै आउनुभएको होस् वा पुस्तौंदेखि यहाँ हुनुभएको होस्, तपाईं परिवार हुनुहुन्छ। हामीसँग सामेल हुनुहोस्, कथाहरू साझा गर्नुहोस्, र हाम्रो सुन्दर परम्पराहरू सँगै जीवित राख्नुहोस्।"}
            </p>
            <Link href="/gallery">
              <Button variant="primary">
                {language === 'en' ? 'View Our Memories' : 'हाम्रो सम्झनाहरू हेर्नुहोस्'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// Events Preview Section
// ============================================

export function EventsSection({ events }: { events: Event[] }) {
  const { t, language } = useTranslation();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-primary-600 font-medium text-sm uppercase tracking-wider">
              {language === 'en' ? 'Come Celebrate With Us' : 'हामीसँग मनाउन आउनुहोस्'}
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mt-3 mb-4">
              {language === 'en' ? 'Upcoming Gatherings' : 'आगामी भेलाहरू'}
            </h2>
            <p className="text-lg text-gray-600 max-w-xl">
              {language === 'en'
                ? 'From festivals to family picnics, there\'s always a reason to come together.'
                : 'चाडपर्वदेखि पारिवारिक पिकनिकसम्म, सधैं एकसाथ आउने कारण छ।'}
            </p>
          </div>
          <Link href="/events" className="mt-4 md:mt-0">
            <Button variant="outline">{t.home.upcomingEvents.viewAll}</Button>
          </Link>
        </div>

        {events.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <ImageCard
                key={event.id}
                image={event.featuredImage || '/images/gallery/1.jpg'}
                alt={event.title}
                title={event.title}
                description={event.description}
                href={`/events/${event.id}`}
                date={formatDate(event.startDate)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <span className="text-5xl mb-4 block">🎉</span>
            <p className="text-gray-600">
              {language === 'en'
                ? 'New events coming soon! Stay tuned.'
                : 'नयाँ कार्यक्रमहरू छिट्टै आउँदैछन्!'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================
// News Preview Section
// ============================================

export function NewsSection({ posts }: { posts: Post[] }) {
  const { t, language } = useTranslation();

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-primary-600 font-medium text-sm uppercase tracking-wider">
              {language === 'en' ? 'Stories & Updates' : 'कथा र अपडेटहरू'}
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mt-3 mb-4">
              {language === 'en' ? 'From Our Community' : 'हाम्रो समुदायबाट'}
            </h2>
            <p className="text-lg text-gray-600 max-w-xl">
              {language === 'en'
                ? 'Stories, news, and updates from our vibrant community.'
                : 'हाम्रो जीवन्त समुदायबाट कथाहरू, समाचारहरू, र अपडेटहरू।'}
            </p>
          </div>
          <Link href="/news" className="mt-4 md:mt-0">
            <Button variant="outline">{t.home.latestNews.viewAll}</Button>
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <ImageCard
                key={post.id}
                image={post.featuredImage || '/images/gallery/2.jpg'}
                alt={post.title}
                title={post.title}
                description={post.excerpt}
                href={`/news/${post.slug}`}
                date={formatDate(post.publishedAt || post.createdAt)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl">
            <span className="text-5xl mb-4 block">📰</span>
            <p className="text-gray-600">
              {language === 'en'
                ? 'Community stories coming soon!'
                : 'समुदायका कथाहरू छिट्टै आउँदैछन्!'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================
// CTA Section - Join the Family
// ============================================

export function CTASection() {
  const { language } = useTranslation();

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/gallery/2.jpg"
          alt="Himalayan mountains"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-secondary-900/80" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <span className="text-6xl mb-6 block">🏠</span>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
          {language === 'en' ? 'You Belong Here' : 'तपाईं यहाँ हुनुहुन्छ'}
        </h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          {language === 'en'
            ? "Whether you're looking to connect with your roots, meet fellow community members, or simply find a place that feels like home — we welcome you with open arms."
            : "तपाईं आफ्नो जरासँग जोडिन खोज्दै हुनुहुन्छ, साथी समुदायका सदस्यहरूलाई भेट्न खोज्दै हुनुहुन्छ, वा केवल घर जस्तो लाग्ने ठाउँ खोज्दै हुनुहुन्छ — हामी तपाईंलाई खुला बाहुलीले स्वागत गर्छौं।"}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-white text-primary-700 hover:bg-gray-100 px-8"
            >
              {language === 'en' ? 'Get In Touch' : 'सम्पर्क गर्नुहोस्'}
            </Button>
          </Link>
          <Link href="/donate">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 px-8"
            >
              {language === 'en' ? 'Support Our Mission' : 'हाम्रो मिशनलाई सहयोग गर्नुहोस्'}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
