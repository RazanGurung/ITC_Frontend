'use client';

import { useTranslation } from '@/context';

export default function SectionLoader({ className = 'py-16' }: { className?: string }) {
  const { language } = useTranslation();

  return (
    <div className={`flex flex-col items-center justify-center gap-3 text-gray-500 ${className}`} role="status">
      <div className="w-10 h-10 rounded-full border-4 border-primary-100 border-t-primary-600 animate-spin" />
      <span className="text-sm">{language === 'en' ? 'Loading…' : 'लोड हुँदैछ…'}</span>
    </div>
  );
}
