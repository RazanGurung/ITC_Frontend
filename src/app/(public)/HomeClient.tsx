'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, ImageCard } from '@/components/ui';
import { useTranslation } from '@/context';
import { formatDate } from '@/lib/utils';
import type { Event, Post } from '@/types';
import { president, executives, secretariat, councilMembers, conferenceImages } from '@/lib/leadership';

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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6 border border-white/20">
            {language === 'en' ? '🏔️ International Tamu (Gurung) Council' : '🏔️ अन्तर्राष्ट्रिय तमू (गुरुङ) परिषद्'}
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
                {language === 'en' ? 'About the Council' : 'परिषद्को बारेमा'}
              </Button>
            </Link>
            <Link href="/events">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 px-8"
              >
                {language === 'en' ? 'Conferences & Events' : 'सम्मेलन र कार्यक्रम'}
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
      value: '2019',
      label: language === 'en' ? 'Founding Conference, Kathmandu' : 'संस्थापक सम्मेलन, काठमाडौं',
    },
    {
      value: '2',
      label: language === 'en' ? 'International Tamu Conferences' : 'अन्तर्राष्ट्रिय तमू सम्मेलन',
    },
    {
      value: '251',
      label: language === 'en' ? 'Member Organizing Committee, 2019' : 'सदस्यीय मुख्य आयोजक समिति, २०१९',
    },
    {
      value: '8',
      label: language === 'en' ? 'Guiding Principles' : 'मार्गदर्शक सिद्धान्त',
    },
  ];

  return (
    <section className="py-6 bg-primary-50 border-y border-primary-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className="flex flex-col md:flex-row md:items-center items-center text-center md:text-left gap-1 md:gap-3 px-2 md:px-4 relative">
              <span className="text-2xl md:text-3xl font-bold text-primary-600">
                {stat.value}
              </span>
              <span className="text-sm text-gray-600">{stat.label}</span>
              {index < stats.length - 1 && (
                <span className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-primary-200" />
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
        ? 'Preserve and promote Tamu language, script, culture, traditions, customs, and heritage.'
        : 'तमू भाषा, लिपि, संस्कृति, परम्परा, रीतिरिवाज र सम्पदाको संरक्षण र प्रवर्द्धन गर्ने।',
    },
    {
      icon: '🤝',
      title: language === 'en' ? 'Unite Community' : 'समुदाय एकता',
      description: language === 'en'
        ? 'Strengthen unity, friendship, and solidarity among Tamu people worldwide.'
        : 'विश्वभरका तमू जनताबीच एकता, मित्रता र एकजुटता सुदृढ गर्ने।',
    },
    {
      icon: '👶',
      title: language === 'en' ? 'Empower Youth' : 'युवा सशक्तिकरण',
      description: language === 'en'
        ? 'Encourage young people and women to participate, lead, and carry Tamu heritage forward.'
        : 'युवा र महिलालाई सहभागी हुन, नेतृत्व गर्न र तमू सम्पदा अगाडि बढाउन प्रोत्साहन गर्ने।',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary-600 font-medium text-sm uppercase tracking-wider">
            {language === 'en' ? 'What We Stand For' : 'हामी के को लागि उभिन्छौं'}
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mt-3 mb-4">
            {language === 'en' ? 'Our Roots, Our Pride' : 'हाम्रो जरा, हाम्रो गौरव'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'en'
              ? 'The International Tamu (Gurung) Council is more than an organization. It represents a shared aspiration to bring Tamu people and organizations around the world closer together.'
              : 'अन्तर्राष्ट्रिय तमू (गुरुङ) परिषद् एक संस्थाभन्दा बढी हो। यो विश्वभरका तमू जनता र संस्थाहरूलाई नजिक ल्याउने साझा आकांक्षा हो।'}
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                  <p className="text-3xl font-bold mb-2">3</p>
                  <p className="text-sm opacity-90">
                    {language === 'en' ? 'Conferences since 2016' : '२०१६ देखि सम्मेलनहरू'}
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
                ? "Tamu communities now live in many countries, but distance should never become a barrier to our relationships, identity, language, culture, and heritage."
                : "तमू समुदाय आज धेरै देशमा बसोबास गर्छ, तर दूरी हाम्रो सम्बन्ध, पहिचान, भाषा, संस्कृति र सम्पदाको बाधक बन्नु हुँदैन।"}
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {language === 'en'
                ? "Our cultural identity is a living heritage. It must not only be preserved in books and records but also practiced, shared, and passed from one generation to another."
                : "हाम्रो सांस्कृतिक पहिचान जीवित सम्पदा हो। यसलाई किताब र अभिलेखमा मात्र होइन, अभ्यास गरेर, बाँडेर र एक पुस्ताबाट अर्को पुस्तामा हस्तान्तरण गरेर जोगाउनुपर्छ।"}
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-primary-600 font-medium text-sm uppercase tracking-wider">
              {language === 'en' ? 'Gather With Us' : 'हामीसँग भेला हुनुहोस्'}
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mt-3 mb-4">
              {language === 'en' ? 'Conferences & Programs' : 'सम्मेलन र कार्यक्रमहरू'}
            </h2>
            <p className="text-lg text-gray-600 max-w-xl">
              {language === 'en'
                ? 'Seminars, workshops, conferences and cultural programs on Tamu language, history, culture and heritage.'
                : 'तमू भाषा, इतिहास, संस्कृति र सम्पदासम्बन्धी गोष्ठी, कार्यशाला, सम्मेलन र सांस्कृतिक कार्यक्रमहरू।'}
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
                ? 'New programs will be announced here. Meanwhile, read about our past conferences.'
                : 'नयाँ कार्यक्रमहरू यहाँ घोषणा गरिनेछन्। यसबीच, हाम्रा विगतका सम्मेलनबारे पढ्नुहोस्।'}
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-primary-600 font-medium text-sm uppercase tracking-wider">
              {language === 'en' ? 'News & Updates' : 'समाचार र अपडेटहरू'}
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mt-3 mb-4">
              {language === 'en' ? 'From the Council' : 'परिषद्बाट'}
            </h2>
            <p className="text-lg text-gray-600 max-w-xl">
              {language === 'en'
                ? 'News, declarations and announcements from Tamu communities around the world.'
                : 'विश्वभरका तमू समुदायबाट समाचार, घोषणापत्र र सूचनाहरू।'}
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
                ? 'News and announcements will appear here.'
                : 'समाचार र सूचनाहरू यहाँ देखिनेछन्।'}
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
          {language === 'en' ? 'Tamu People of the World, Let Us Unite' : 'विश्वका तमूहरू, एक होऔं'}
        </h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          {language === 'en'
            ? "The Council welcomes Tamu organizations, communities, scholars, intellectuals, professionals, youth, women, cultural leaders, well-wishers, and friends of the Tamu community around the world."
            : "परिषद्ले विश्वभरका तमू संस्था, समुदाय, विद्वान्, बुद्धिजीवी, पेशाकर्मी, युवा, महिला, सांस्कृतिक अगुवा, शुभचिन्तक र तमू समुदायका मित्रहरूको सहभागितालाई स्वागत गर्छ।"}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact">
            <Button
              size="lg"
              className="!bg-white !text-primary-700 hover:!bg-gray-100 px-8"
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
              {language === 'en' ? 'Support the Council' : 'परिषद्लाई सहयोग गर्नुहोस्'}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================
// Leadership Preview
// ============================================

export function LeadershipSection() {
  const { language } = useTranslation();
  const en = language === 'en';
  const board = [...executives, ...secretariat, ...councilMembers];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-primary-600 font-medium text-sm uppercase tracking-wider">
            {en ? 'Our Leadership' : 'हाम्रो नेतृत्व'}
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mt-3 mb-4">
            {en ? 'Guardians of Our Culture and Tradition' : 'हाम्रो संस्कृति र परम्पराका संरक्षक'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {en
              ? 'A board drawn from Tamu communities in India, Nepal, the United States, Australia, South Korea, Israel and Qatar.'
              : 'भारत, नेपाल, अमेरिका, अष्ट्रेलिया, दक्षिण कोरिया, इजरायल र कतारका तमू समुदायबाट बनेको बोर्ड।'}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-center max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <Link href="/about#president" className="group block relative rounded-3xl overflow-hidden shadow-xl">
              <img
                src={president.image}
                alt={`${president.name}, ${president.role}`}
                loading="lazy"
                className="w-full aspect-[4/5] object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <p className="text-xs uppercase tracking-widest text-primary-200">{en ? 'President' : 'अध्यक्ष'}</p>
                <p className="text-2xl font-heading font-bold">{president.name}</p>
              </div>
            </Link>
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-6">
              {board.map((member) => (
                <Link key={member.name} href="/about#board" className="text-center group">
                  <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full overflow-hidden ring-4 ring-primary-100 group-hover:ring-primary-400 transition-all bg-gray-100">
                    <img src={member.image} alt={member.name} loading="lazy" className="w-full h-full object-cover object-top" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900 mt-3 leading-tight">{member.name}</p>
                  <p className="text-xs text-primary-600 mt-0.5">{member.role}</p>
                </Link>
              ))}
            </div>
            <div className="mt-10">
              <Link href="/about#board">
                <Button size="lg">{en ? 'Meet the Board' : 'बोर्डलाई भेट्नुहोस्'}</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// 2019 Conference Spotlight
// ============================================

export function ConferenceSection() {
  const { language } = useTranslation();
  const en = language === 'en';

  return (
    <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <span className="text-primary-200 font-medium text-sm uppercase tracking-wider">
              {en ? 'A Historic Gathering' : 'ऐतिहासिक भेला'}
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mt-3 mb-5">
              {en ? 'First International Tamu Conference' : 'प्रथम अन्तर्राष्ट्रिय तमू सम्मेलन'}
            </h2>
            <p className="text-white/85 text-lg leading-relaxed mb-4">
              {en
                ? 'Held in Kathmandu on 11–12 October 2019 with a 251-member Main Organizing Committee, the conference adopted the By-Laws (Constitution) of the International Tamu (Gurung) Council and the Kathmandu Declaration 2019 under the theme “Unity, Identity and Prosperity”.'
                : '११–१२ अक्टोबर २०१९ मा काठमाडौंमा २५१ सदस्यीय मुख्य आयोजक समितिसहित सम्पन्न यस सम्मेलनले “एकता, पहिचान र समृद्धि” भन्ने नाराअन्तर्गत अन्तर्राष्ट्रिय तमू (गुरुङ) परिषद्को विधान र काठमाडौं घोषणापत्र २०१९ पारित गर्‍यो।'}
            </p>
            <p className="text-white/70 mb-8">
              {en
                ? 'The 146-page Smarika (souvenir) of the conference is available to read.'
                : 'सम्मेलनको १४६ पृष्ठको स्मारिका पढ्न उपलब्ध छ।'}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/about#publication">
                <Button size="lg" className="!bg-white !text-primary-800 hover:!bg-gray-100">
                  {en ? 'Read the Smarika' : 'स्मारिका पढ्नुहोस्'}
                </Button>
              </Link>
              <Link href="/about#background">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  {en ? 'Our History' : 'हाम्रो इतिहास'}
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src={conferenceImages[0].src}
              alt={conferenceImages[0].alt}
              loading="lazy"
              className="col-span-2 w-full h-56 md:h-64 object-cover rounded-2xl shadow-2xl"
            />
            <img
              src={conferenceImages[1].src}
              alt={conferenceImages[1].alt}
              loading="lazy"
              className="w-full h-40 object-cover rounded-2xl shadow-2xl"
            />
            <img
              src="/images/conference2019/smarika-cover.jpg"
              alt="Cover of the 2019 conference Smarika"
              loading="lazy"
              className="w-full h-40 object-cover object-top rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
