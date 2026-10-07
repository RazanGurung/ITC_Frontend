'use client';

import Link from 'next/link';
import { useTranslation } from '@/context';

// ============================================
// Footer Component
// ============================================

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t, language } = useTranslation();

  // Navigation items with translations
  const quickLinks = [
    { label: t.nav.about, href: '/about' },
    { label: t.nav.events, href: '/events' },
    { label: t.nav.news, href: '/news' },
    { label: t.nav.gallery, href: '/gallery' },
  ];

  const supportLinks = [
    { label: t.nav.contact, href: '/contact' },
    { label: t.nav.donate, href: '/donate' },
    { label: t.footer.volunteer, href: '/about#board' },
    { label: t.footer.membership, href: '/about#publication' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Organization Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <img
                src="/images/logos/logo.png"
                alt="ITC Logo"
                className="w-12 h-12 object-contain"
              />
              <div>
                <h2 className="font-heading font-bold text-base text-white">
                  {language === 'ne' ? 'अन्तर्राष्ट्रिय तमू (गुरुङ)' : 'International Tamu (Gurung)'}
                </h2>
                <p className="text-xs text-gray-400">{language === 'ne' ? 'परिषद्' : 'Council'}</p>
              </div>
            </Link>
            <p className="text-sm text-gray-400 mb-6">
              {t.footer.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t.footer.getInvolved}</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t.footer.contactUs}</h3>
            <address className="not-italic space-y-3 text-sm text-gray-400">
              <p className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>
                  ITC Secretariat<br />
                  Kathmandu, Nepal<br />
                  P.O. Box 23348
                </span>
              </p>
              <p className="flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:tamucouncil2019@gmail.com" className="hover:text-primary-400 transition-colors">
                  tamucouncil2019@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+977014385868" className="hover:text-primary-400 transition-colors">
                  +977-014385868
                </a>
              </p>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p className="italic">{language === 'ne' ? 'एकता · पहिचान · समृद्धि' : 'Unity · Identity · Prosperity'}</p>
            <p>{t.footer.copyright.replace('{year}', currentYear.toString())}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
