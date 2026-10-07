'use client';

import Link from 'next/link';
import { Button } from '@/components/ui';
import { useTranslation } from '@/context';
import {
  president as presidentEn,
  executives as executivesEn,
  secretariat as secretariatEn,
  councilMembers as councilMembersEn,
  heritageImages as heritageImagesEn,
  conferenceImages as conferenceImagesEn,
  milestones as milestonesEn,
  type LeadershipMember,
} from '@/lib/leadership';
import { councilDoc, smarika } from '@/lib/content/council';
import { reshamGurung as reshamEn } from '@/lib/content/founding-coordinator';
import {
  councilDocNe,
  milestonesNe,
  milestoneDescriptionsNe,
  heritageCaptionsNe,
  conferenceCaptionsNe,
  presidentNe,
  reshamGurungNe,
  localizeMember,
} from '@/lib/content/about-ne';

// ============================================
// Small building blocks
// ============================================

function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl mx-auto text-center mb-12">
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-widest text-primary-600 mb-3">{eyebrow}</p>
      )}
      <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">{title}</h2>
      {children}
    </div>
  );
}

function CheckList({ items, columns = false }: { items: string[]; columns?: boolean }) {
  return (
    <ul className={`space-y-4 ${columns ? 'md:grid md:grid-cols-2 md:gap-x-10 md:space-y-0 md:gap-y-4' : ''}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <svg className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-gray-700">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-l-4 border-primary-500 pl-5 py-1 text-xl font-heading italic text-gray-800">
      {children}
    </blockquote>
  );
}

// ============================================
// Leadership Components
// ============================================

function Portrait({ member, className }: { member: LeadershipMember; className: string }) {
  return (
    <img
      src={member.image}
      alt={`${member.name}, ${member.role}`}
      loading="lazy"
      className={`object-cover ${className}`}
    />
  );
}

function ExecutiveCard({ member }: { member: LeadershipMember }) {
  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      <div className="aspect-[4/5] bg-gray-100">
        <Portrait member={member} className="w-full h-full object-top" />
      </div>
      <div className="p-6 flex-1">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">{member.role}</p>
        <h3 className="text-xl font-heading font-bold text-gray-900 mt-1">{member.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{member.location}</p>
        <ul className="mt-4 space-y-2">
          {member.highlights.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-gray-600">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-secondary-600 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function CompactMemberCard({ member }: { member: LeadershipMember }) {
  return (
    <article className="text-center">
      <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-primary-100 bg-gray-100">
        <Portrait member={member} className="w-full h-full object-top" />
      </div>
      <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">{member.role}</p>
      <h3 className="text-lg font-semibold text-gray-900 mt-1">{member.name}</h3>
      <p className="text-sm text-gray-500">{member.location}</p>
      <p className="text-sm text-gray-600 mt-2">{member.summary}</p>
    </article>
  );
}

// ============================================
// About Page
// ============================================

export default function AboutPage() {
  const { t, language } = useTranslation();
  const ne = language === 'ne';
  const tr = (en: string, nep: string) => (ne ? nep : en);
  const doc = ne ? councilDocNe : councilDoc;
  const president = ne ? { ...presidentEn, ...presidentNe } : presidentEn;
  const executives = executivesEn.map((m) => localizeMember(m, ne));
  const secretariat = secretariatEn.map((m) => localizeMember(m, ne));
  const councilMembers = councilMembersEn.map((m) => localizeMember(m, ne));
  const heritageImages = heritageImagesEn.map((img, i) => ({ ...img, caption: ne ? heritageCaptionsNe[i] : img.caption }));
  const conferenceImages = conferenceImagesEn.map((img, i) => ({ ...img, caption: ne ? conferenceCaptionsNe[i] : img.caption }));
  const milestones = milestonesEn.map((m, i) =>
    ne ? { ...m, title: milestonesNe[i].title, place: milestonesNe[i].place, description: milestoneDescriptionsNe[i] } : m
  );
  const reshamGurung = ne
    ? {
        ...reshamEn,
        ...reshamGurungNe,
        journey: reshamEn.journey.map((step, i) => ({ ...step, ...reshamGurungNe.journey[i] })),
        worldStage: reshamEn.worldStage.map((stop, i) => ({ ...stop, ...reshamGurungNe.worldStage[i] })),
        writing: reshamEn.writing.map((item, i) => ({ ...item, title: reshamGurungNe.writing[i] })),
        highlights: reshamGurungNe.highlights,
      }
    : reshamEn;

  return (
    <>
      {/* Hero Section */}
      <section className="page-header">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-600 mb-4">
                {tr('Unity · Identity · Prosperity', 'एकता · पहिचान · समृद्धि')}
              </p>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
                {t.about.title}
              </h1>
              <p className="text-xl text-gray-600">{t.about.subtitle}</p>
              <div className="flex flex-wrap gap-3 mt-8">
                <a href="#president" className="px-4 py-2 rounded-full bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors">{tr('President', 'अध्यक्ष')}</a>
                <a href="#board" className="px-4 py-2 rounded-full bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors">{tr('Board & Council', 'बोर्ड र परिषद्')}</a>
                <a href="#founding-coordinator" className="px-4 py-2 rounded-full border border-primary-600 text-primary-700 text-sm font-medium hover:bg-primary-50 transition-colors">{tr('Founding Coordinator', 'संस्थापक संयोजक')}</a>
              </div>
            </div>
            <div className="relative">
              <img
                src={heritageImages[0].src}
                alt={heritageImages[0].alt}
                className="w-full aspect-[4/3] object-cover rounded-2xl shadow-xl"
              />
              <p className="absolute bottom-3 left-3 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
                {heritageImages[0].caption}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* President */}
      <section id="president" className="scroll-mt-24 py-16 md:py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-10 items-center max-w-5xl mx-auto">
            <div className="md:col-span-2">
              <img
                src={president.image}
                alt={`${president.name}, ${president.role}, ${president.organization}`}
                className="w-full aspect-[4/5] object-cover object-top rounded-2xl shadow-2xl ring-4 ring-white/20"
              />
            </div>
            <div className="md:col-span-3">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-200 mb-3">
                {president.role}
              </p>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-2">{president.name}</h2>
              <p className="text-lg text-white/80 mb-6">{president.organization}</p>

              <ul className="space-y-2 mb-8">
                {president.titles.map((title) => (
                  <li key={title} className="flex items-start gap-3 text-white/90">
                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary-300 flex-shrink-0" />
                    {title}
                  </li>
                ))}
              </ul>

              <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4 border-t border-white/20 pt-6">
                {president.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-xs uppercase tracking-widest text-primary-200">{fact.label}</dt>
                    <dd className="text-white/90 mt-1">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="board" className="section bg-gray-50 scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t.about.team.title}>
            <p className="text-lg text-gray-600">{t.about.team.subtitle}</p>
          </SectionHeading>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {executives.map((member) => (
              <ExecutiveCard key={member.name} member={member} />
            ))}
          </div>

          <div className="max-w-6xl mx-auto mt-16">
            <h3 className="text-2xl font-heading font-bold text-gray-900 text-center mb-8">
              {tr('Secretariat & Council Members', 'सचिवालय र परिषद् सदस्यहरू')}
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
              {[...secretariat, ...councilMembers].map((member) => (
                <CompactMemberCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Introduction & Vision */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">{tr('Introduction', 'परिचय')}</h2>
              <div className="space-y-5 text-lg text-gray-600">
                {doc.introduction.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-8">
                <Quote>{doc.introQuote}</Quote>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 lg:p-10">
                <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4">{t.about.vision.title}</h3>
                <p className="text-xl font-heading text-primary-800 mb-4">{doc.vision.headline}</p>
                <p className="text-gray-700">{doc.vision.body}</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-8 lg:p-10 border border-gray-100">
                <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4">{t.about.mission.title}</h3>
                <p className="text-gray-700">{doc.mission.headline}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage imagery */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {heritageImages.slice(1).map((image) => (
              <figure key={image.src} className="relative overflow-hidden rounded-2xl shadow-md">
                <img src={image.src} alt={image.alt} loading="lazy" className="w-full h-64 object-cover" />
                <figcaption className="absolute bottom-3 left-3 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
                  {image.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Mission in detail */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={tr('What we work to do', 'हामी के गर्न काम गर्छौं')} title={tr('Our Mission in Action', 'हाम्रो अभियान: व्यवहारमा')}>
            <p className="text-lg text-gray-600">{doc.mission.lead}</p>
          </SectionHeading>
          <div className="max-w-5xl mx-auto">
            <CheckList items={doc.mission.items} columns />
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="section bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={tr('Objectives', 'उद्देश्यहरू')}>
            <p className="text-lg text-gray-600">{doc.objectives.lead}</p>
          </SectionHeading>
          <ol className="max-w-4xl mx-auto space-y-4">
            {doc.objectives.items.map((item, index) => (
              <li key={item} className="flex gap-4 bg-white rounded-xl p-5 border border-gray-100">
                <span className="w-9 h-9 rounded-full bg-primary-600 text-white flex items-center justify-center font-semibold flex-shrink-0">
                  {String.fromCharCode(97 + index)}
                </span>
                <span className="text-gray-700 pt-1">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Programs & Expected Outcomes */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-3">{tr('Programs and Activities', 'कार्यक्रम र गतिविधिहरू')}</h2>
              <p className="text-gray-600 mb-6">{doc.programs.lead}</p>
              <CheckList items={doc.programs.items} />
            </div>
            <div>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-3">{tr('Expected Outcomes', 'अपेक्षित परिणामहरू')}</h2>
              <p className="text-gray-600 mb-6">{doc.outcomes.lead}</p>
              <CheckList items={doc.outcomes.items} />
            </div>
          </div>
        </div>
      </section>

      {/* Guiding principles */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <h2 className="text-3xl font-heading font-bold text-white mb-3">{tr('Guiding Principles', 'मार्गदर्शक सिद्धान्तहरू')}</h2>
          <p className="text-white/90 mb-8">{doc.principles.lead}</p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {doc.principles.items.map((principle) => (
              <span key={principle} className="px-5 py-2 rounded-full bg-white/15 border border-white/30 font-medium">
                {principle}
              </span>
            ))}
          </div>
          <p className="text-2xl font-heading italic">{doc.principles.motto}</p>
        </div>
      </section>

      {/* Background & timeline */}
      <section id="background" className="section bg-white scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={t.about.history.title} title={tr('Background', 'पृष्ठभूमि')}>
            <p className="text-lg text-gray-600">{t.about.history.subtitle}</p>
          </SectionHeading>

          <div className="max-w-3xl mx-auto space-y-5 text-lg text-gray-600 mb-10">
            {doc.background.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
            <p className="text-center text-2xl font-heading font-bold text-primary-700 pt-2">{doc.theme}</p>
            {doc.backgroundAfterTheme.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    {index < milestones.length - 1 && <div className="w-0.5 h-full bg-primary-200 mt-2" />}
                  </div>
                  <div className="pb-8">
                    <span className="text-primary-600 font-semibold">{milestone.year}</span>
                    <h3 className="text-xl font-semibold text-gray-900 mt-1">{milestone.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{milestone.place}</p>

                    {milestone.year === '2019' && (
                      <div className="grid sm:grid-cols-2 gap-4 mt-6">
                        {conferenceImages.map((image) => (
                          <figure key={image.src}>
                            <img
                              src={image.src}
                              alt={image.alt}
                              loading="lazy"
                              className="w-full h-48 object-cover rounded-xl shadow"
                            />
                            <figcaption className="text-xs text-gray-500 mt-2">{image.caption}</figcaption>
                          </figure>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founding Coordinator */}
      <section id="founding-coordinator" className="section bg-white scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={reshamGurung.role} title={reshamGurung.name}>
            <p className="text-lg text-gray-600">{reshamGurung.tagline}</p>
          </SectionHeading>

          <div className="max-w-6xl mx-auto">
            {/* Portrait + story */}
            <div className="grid lg:grid-cols-5 gap-10 items-center rounded-3xl bg-gradient-to-br from-primary-50 via-white to-secondary-50 border border-primary-100 p-6 md:p-10">
              <div className="lg:col-span-2 flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary-300 to-secondary-300 opacity-60 blur-xl" />
                  <img
                    src={reshamGurung.image}
                    alt={`${reshamGurung.name}, ${reshamGurung.role}`}
                    className="relative w-56 h-64 md:w-64 md:h-72 object-cover object-top rounded-3xl shadow-xl ring-4 ring-white"
                  />
                </div>
              </div>
              <div className="lg:col-span-3 space-y-4 text-lg text-gray-700 leading-relaxed">
                {reshamGurung.story.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
                <div className="flex flex-wrap gap-2 pt-2">
                  {reshamGurung.focus.map((item) => (
                    <span key={item} className="px-3 py-1 rounded-full bg-white border border-primary-200 text-primary-800 text-sm font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {reshamGurung.highlights.map((item) => (
                <div key={item.label} className="rounded-2xl bg-gray-50 border border-gray-100 p-5 text-center">
                  <p className="text-3xl font-heading font-bold text-primary-600">{item.value}</p>
                  <p className="text-sm text-gray-600 mt-2">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Journey + side column */}
            <div className="grid lg:grid-cols-3 gap-10 mt-14">
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-heading font-bold text-gray-900 mb-8">{tr('A Life of Service', 'सेवामा समर्पित जीवन')}</h3>
                <ol className="relative border-l-2 border-primary-200 ml-3 space-y-8">
                  {reshamGurung.journey.map((step) => (
                    <li key={step.title} className="pl-8 relative">
                      <span className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-primary-600 ring-4 ring-white" />
                      <p className="text-sm font-semibold text-primary-600">{step.period}</p>
                      <h4 className="text-lg font-semibold text-gray-900 mt-1">{step.title}</h4>
                      <p className="text-gray-600 mt-1">{step.text}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="space-y-8">
                <div className="rounded-2xl bg-gradient-to-br from-primary-900 to-secondary-900 text-white p-6">
                  <h3 className="text-xl font-heading font-bold text-white mb-4">{tr('On the World Stage', 'विश्व मञ्चमा')}</h3>
                  <ul className="space-y-4">
                    {reshamGurung.worldStage.map((stop) => (
                      <li key={stop.place}>
                        <p className="font-semibold text-primary-200">{stop.place}</p>
                        <p className="text-sm text-white/85">{stop.detail}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">{tr('Selected Writing', 'चुनिएका लेखनहरू')}</h3>
                  <ul className="space-y-3">
                    {reshamGurung.writing.map((item) => (
                      <li key={item.title}>
                        <p className="font-medium text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-500">
                          {item.where}
                          {item.year && ` · ${item.year}`}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-primary-700 mb-3">{tr('Worked with', 'सहकार्य गरेका संस्था')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {reshamGurung.partners.map((partner) => (
                      <span key={partner} className="px-3 py-1 rounded-lg bg-gray-100 text-gray-700 text-sm">
                        {partner}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    {tr('Languages', 'भाषाहरू')}: {reshamGurung.languages.join(' · ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publication: Smarika */}
      <section id="publication" className="section bg-gray-50 scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={tr('Publication', 'प्रकाशन')} title={ne ? smarika.titleNe : smarika.title}>
            <p className="text-lg text-gray-600">{ne ? smarika.title : smarika.titleNe}</p>
          </SectionHeading>

          <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-10 items-start">
            <div className="md:col-span-2">
              <img
                src={smarika.cover}
                alt={ne ? `${smarika.titleNe} को आवरण` : `Cover of the ${smarika.title}`}
                loading="lazy"
                className="w-full max-w-sm mx-auto rounded-xl shadow-xl"
              />
            </div>
            <div className="md:col-span-3">
              <p className="text-gray-700 mb-1">{tr(smarika.dates, '११–१२ अक्टोबर २०१९ · राष्ट्रिय सभा गृह, काठमाडौं, नेपाल')}</p>
              <p className="text-gray-500 text-sm mb-6">
                {ne ? `${smarika.pages} पृष्ठ · नेपाली भाषामा प्रकाशित` : `${smarika.pages} pages · Published in ${smarika.language}`}
              </p>

              <h3 className="text-sm font-semibold uppercase tracking-widest text-primary-700 mb-3">{tr('Contents', 'विषयसूची')}</h3>
              <ul className="divide-y divide-gray-200 bg-white rounded-xl border border-gray-100 mb-6">
                {smarika.contents.map((item) => (
                  <li key={item.ne} className="flex justify-between items-center px-4 py-2.5">
                    <span>
                      <span className="font-semibold text-gray-900">{ne ? item.ne : item.en}</span>
                      <span className="text-gray-500 text-sm ml-2">{ne ? item.en : item.ne}</span>
                    </span>
                    <span className="text-sm text-gray-500">{tr('Pages', 'पृष्ठ')} {item.pages}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3 mb-6">
                <a href={smarika.file} target="_blank" rel="noopener noreferrer">
                  <Button size="lg">{tr('Read the Smarika (PDF)', 'स्मारिका पढ्नुहोस् (PDF)')}</Button>
                </a>
                <a href={smarika.file} download>
                  <Button size="lg" variant="outline">{tr('Download', 'डाउनलोड')}</Button>
                </a>
              </div>

              <p className="text-sm text-gray-500">
                {tr('Published by the International Tamu (Gurung) Council Secretariat, Kathmandu, Nepal', 'अन्तर्राष्ट्रिय तमू (गुरुङ) परिषद् सचिवालय, काठमाडौं, नेपालद्वारा प्रकाशित')} ·{' '}
                {smarika.publisher.email}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-5 text-lg text-gray-600">
            {doc.conclusion.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
            <p className="text-center text-2xl font-heading italic text-primary-800 pt-4">{doc.closingQuote}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">{t.about.cta.title}</h2>
          <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">{t.about.cta.subtitle}</p>
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
