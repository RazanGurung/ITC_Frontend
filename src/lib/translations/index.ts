export { en, type Translations } from './en';
export { ne } from './ne';

import { en } from './en';
import { ne } from './ne';

export const translations = {
  en,
  ne,
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof en;
