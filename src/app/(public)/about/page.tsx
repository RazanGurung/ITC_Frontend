'use client';

import Link from 'next/link';
import { Button } from '@/components/ui';
import { useTranslation } from '@/context';

// ============================================
// Team Member Component
// ============================================

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  { name: 'John Smith', role: 'President', image: '/images/team/president.jpg' },
  { name: 'Sarah Johnson', role: 'Vice President', image: '/images/team/vp.jpg' },
  { name: 'Michael Chen', role: 'Secretary', image: '/images/team/secretary.jpg' },
  { name: 'Emily Davis', role: 'Treasurer', image: '/images/team/treasurer.jpg' },
];

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="text-center">
      <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
          <span className="text-3xl font-bold text-primary-600">
            {member.name.charAt(0)}
          </span>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
      <p className="text-primary-600">{member.role}</p>
    </div>
  );
}

// ============================================
// About Page
// ============================================

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero Section */}
      <section className="page-header">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
              {t.about.title}
            </h1>
            <p className="text-xl text-gray-600">
              {t.about.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
                {t.about.mission.title}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {t.about.mission.content}
              </p>
              <p className="text-lg text-gray-600">
                {t.about.mission.content2}
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 lg:p-12">
              <h3 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                {t.about.vision.title}
              </h3>
              <ul className="space-y-4">
                {t.about.vision.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
              {t.about.history.title}
            </h2>
            <p className="text-lg text-gray-600">
              {t.about.history.subtitle}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {[
                { year: '1999', title: 'Founded', description: 'ITC was established by a group of dedicated community members with a vision to preserve and celebrate cultural heritage.' },
                { year: '2005', title: 'First Major Event', description: 'Hosted our first large-scale cultural festival, bringing together over 1,000 community members.' },
                { year: '2012', title: 'Youth Programs', description: 'Launched educational programs for youth, focusing on cultural awareness and leadership development.' },
                { year: '2020', title: 'Digital Expansion', description: 'Adapted to global challenges by expanding our programs online, reaching a wider audience.' },
                { year: '2024', title: 'Growing Strong', description: 'Continuing to grow with new programs, partnerships, and community initiatives.' },
              ].map((milestone, index) => (
                <div key={milestone.year} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    {index < 4 && <div className="w-0.5 h-full bg-primary-200 mt-2" />}
                  </div>
                  <div className="pb-8">
                    <span className="text-primary-600 font-semibold">{milestone.year}</span>
                    <h3 className="text-xl font-semibold text-gray-900 mt-1">{milestone.title}</h3>
                    <p className="text-gray-600 mt-2">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
              {t.about.team.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.about.team.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">
            {t.about.cta.title}
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
            {t.about.cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100">
                {t.home.cta.contact}
              </Button>
            </Link>
            <Link href="/donate">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                {t.home.cta.support}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
