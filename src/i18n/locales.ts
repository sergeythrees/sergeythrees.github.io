import type { Locale } from '../data/types';

export const LOCALES: Locale[] = ['ru', 'en'];
export const DEFAULT_LOCALE: Locale = 'ru';

export const LOCALE_STORAGE_KEY = 'st.locale';

export interface LocaleMeta {
  code: Locale;
  /** Название языка в интерфейсе — всегда на своём языке. */
  label: string;
  /** Короткая подпись под названием. */
  hint: string;
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  ru: { code: 'ru', label: 'RU', hint: 'Русский' },
  en: { code: 'en', label: 'EN', hint: 'English' },
};

export function isLocale(value: string | null | undefined): value is Locale {
  return value === 'ru' || value === 'en';
}
