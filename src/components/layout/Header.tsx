'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { useTranslation } from '@/context';
import type { Language } from '@/lib/translations';

// ============================================
// Language Toggle Component
// ============================================

function LanguageToggle() {
  const { language, setLanguage, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang: Language = language === 'en' ? 'ne' : 'en';
    setLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
      aria-label={`${t.language.switchTo} ${language === 'en' ? t.language.ne : t.language.en}`}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
        />
      </svg>
      <span className="hidden sm:inline">
        {language === 'en' ? 'नेपाली' : 'English'}
      </span>
      <span className="sm:hidden">
        {language === 'en' ? 'ने' : 'EN'}
      </span>
    </button>
  );
}

// ============================================
// Header Component
// ============================================

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  // Navigation items with translations
  const navItems = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.about, href: '/about' },
    { label: t.nav.events, href: '/events' },
    { label: t.nav.news, href: '/news' },
    { label: t.nav.gallery, href: '/gallery' },
    { label: t.nav.contact, href: '/contact' },
  ];

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/images/logos/logo.png"
              alt="ITC Logo"
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
            <div className="hidden sm:block">
              <h1 className="font-heading font-bold text-lg text-gray-900">
                International TAMU
              </h1>
              <p className="text-xs text-gray-500">Corporation</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActiveLink(item.href)
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Side: Language Toggle & CTA */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageToggle />
            <Link href="/donate">
              <Button variant="primary" size="sm">
                {t.nav.donate}
              </Button>
            </Link>
          </div>

          {/* Mobile: Language Toggle & Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <LanguageToggle />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-gray-200 animate-slide-down">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'block px-4 py-3 rounded-lg text-base font-medium transition-colors',
                      isActiveLink(item.href)
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/donate"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block"
                >
                  <Button variant="primary" fullWidth>
                    {t.nav.donate}
                  </Button>
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
