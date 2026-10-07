'use client';

import { Badge } from '@/components/ui';
import { useTranslation } from '@/context';
import { formatDate } from '@/lib/utils';
import type { Event } from '@/types';

// ============================================
// Event Card Component
// ============================================

export function EventCard({ event }: { event: Event }) {
  const { t } = useTranslation();

  const statusColors = {
    upcoming: 'primary',
    ongoing: 'success',
    completed: 'default',
    cancelled: 'danger',
  } as const;

  const statusLabels = {
    upcoming: t.events.status.upcoming,
    ongoing: t.events.status.ongoing,
    completed: t.events.status.completed,
    cancelled: t.events.status.cancelled,
  };

  return (
    <article className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-video w-full overflow-hidden relative">
        <div className="absolute top-3 left-3 z-10">
          <Badge variant={statusColors[event.status]} size="sm">
            {statusLabels[event.status]}
          </Badge>
        </div>
        {event.featuredImage ? (
          <img
            src={event.featuredImage}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
            <svg className="w-16 h-16 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{formatDate(event.startDate)}</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
          <a href={`/events/${event.id}`} className="hover:underline">
            {event.title}
          </a>
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{event.location}</span>
        </div>
      </div>
    </article>
  );
}

// ============================================
// Events Page Header
// ============================================

export function EventsHeader() {
  const { t } = useTranslation();

  return (
    <section className="page-header">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
            {t.events.title}
          </h1>
          <p className="text-xl text-gray-600">
            {t.events.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================
// Events Empty State
// ============================================

export function EventsEmptyState() {
  const { t } = useTranslation();

  return (
    <div className="text-center py-16 bg-gray-50 rounded-xl">
      <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.events.noEvents}</h3>
      <p className="text-gray-500">{t.events.noEventsSubtitle}</p>
    </div>
  );
}

// ============================================
// Conference Milestones
// ============================================

const conferenceMilestones = [
  {
    year: '2016',
    en: { title: 'Historic First Tamu SAARC Conference', place: 'Dharan, Sunsari, Nepal', date: '23–24 October 2016' },
    ne: { title: 'ऐतिहासिक प्रथम तमू सार्क सम्मेलन', place: 'धरान, सुनसरी, नेपाल', date: '२३–२४ अक्टोबर २०१६' },
    image: null as string | null,
  },
  {
    year: '2019',
    en: { title: 'First International Tamu Conference', place: 'Kathmandu, Nepal', date: '11–12 October 2019' },
    ne: { title: 'प्रथम अन्तर्राष्ट्रिय तमू सम्मेलन', place: 'काठमाडौं, नेपाल', date: '११–१२ अक्टोबर २०१९' },
    image: '/images/conference2019/conference-2019-stage.jpg',
  },
  {
    year: '2022',
    en: { title: 'Second International Tamu (Gurung) Conference', place: 'Dentam, West Sikkim, India', date: '11–13 October 2022' },
    ne: { title: 'दोस्रो अन्तर्राष्ट्रिय तमू (गुरुङ) सम्मेलन', place: 'डेन्तम, पश्चिम सिक्किम, भारत', date: '११–१३ अक्टोबर २०२२' },
    image: null as string | null,
  },
];

export function ConferenceMilestones() {
  const { language } = useTranslation();
  const en = language === 'en';

  return (
    <section className="section bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-600 mb-3">
            {en ? 'Where we have gathered' : 'हामी जहाँ भेला भयौं'}
          </p>
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
            {en ? 'Conference Milestones' : 'सम्मेलनका कोसेढुङ्गा'}
          </h2>
          <p className="text-lg text-gray-600">
            {en ? 'Unity, Identity and Prosperity' : 'एकता, पहिचान र समृद्धि'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {conferenceMilestones.map((c) => {
            const text = en ? c.en : c.ne;
            return (
              <article key={c.year} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                {c.image ? (
                  <img src={c.image} alt={c.en.title} loading="lazy" className="w-full h-44 object-cover" />
                ) : (
                  <div className="w-full h-44 bg-gradient-to-br from-primary-600 to-secondary-700 flex items-center justify-center">
                    <span className="text-5xl font-heading font-bold text-white/90">{c.year}</span>
                  </div>
                )}
                <div className="p-6 flex-1">
                  <p className="text-sm font-semibold text-primary-600">{text.date}</p>
                  <h3 className="text-lg font-semibold text-gray-900 mt-1">{text.title}</h3>
                  <p className="text-sm text-gray-500 mt-2">{text.place}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <a href="/about#background" className="text-primary-700 font-semibold hover:text-primary-800">
            {en ? 'Read the full story →' : 'पूरा कथा पढ्नुहोस् →'}
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================
// Newsletter Section
// ============================================

export function EventsNewsletter() {
  const { language } = useTranslation();
  const en = language === 'en';

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
            {en ? 'Organizing a Tamu program?' : 'तमू कार्यक्रम आयोजना गर्दै हुनुहुन्छ?'}
          </h2>
          <p className="text-gray-600 mb-6">
            {en
              ? 'The Council supports Tamu organizations around the world. Write to the Secretariat to hear about upcoming conferences or to take part.'
              : 'परिषद्ले विश्वभरका तमू संस्थाहरूलाई सहयोग गर्छ। आगामी सम्मेलनबारे जान्न वा सहभागी हुन सचिवालयलाई सम्पर्क गर्नुहोस्।'}
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            {en ? 'Contact the Secretariat' : 'सचिवालयलाई सम्पर्क गर्नुहोस्'}
          </a>
        </div>
      </div>
    </section>
  );
}
