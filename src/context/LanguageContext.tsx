'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { translations, type Language, type Translations } from '@/lib/translations';

// ============================================
// Language Context Types
// ============================================

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  toggleLanguage: () => void;
}

// ============================================
// Language Context
// ============================================

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Local storage key
const LANGUAGE_STORAGE_KEY = 'itc_language';

// ============================================
// Language Provider Component
// ============================================

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isHydrated, setIsHydrated] = useState(false);

  // Load language preference from localStorage on mount
  useEffect(() => {
    const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
    if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'ne')) {
      setLanguageState(storedLanguage);
    }
    setIsHydrated(true);
    const timer = window.setTimeout(() => document.documentElement.classList.add('scroll-ready'), 500);
    return () => window.clearTimeout(timer);
  }, []);

  // Update document lang attribute when language changes
  useEffect(() => {
    if (isHydrated) {
      document.documentElement.lang = language;
      // Add Nepali font class if needed
      if (language === 'ne') {
        document.documentElement.classList.add('font-nepali');
      } else {
        document.documentElement.classList.remove('font-nepali');
      }
    }
  }, [language, isHydrated]);

  // Set language and persist to localStorage
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  }, []);

  // Toggle between English and Nepali
  const toggleLanguage = useCallback(() => {
    const newLang = language === 'en' ? 'ne' : 'en';
    setLanguage(newLang);
  }, [language, setLanguage]);

  // Get translations for current language
  const t = translations[language];

  // Children render immediately (the first render matches the server, in English),
  // so the browser can restore the scroll position on refresh.
  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        toggleLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

// ============================================
// useLanguage Hook
// ============================================

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// ============================================
// useTranslation Hook (alias for convenience)
// ============================================

export function useTranslation() {
  const { t, language, setLanguage, toggleLanguage } = useLanguage();
  return { t, language, setLanguage, toggleLanguage };
}
