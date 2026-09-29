import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, isLocale } from './locales';
import type { Locale } from '../data/types';
import { en } from './dictionary/en';
import { ru } from './dictionary/ru';
import type { Dictionary } from './dictionary/ru';
import { contentEn } from '../data/content/en';
import { contentRu } from '../data/content/ru';
import type { Content } from '../data/types';

const DICTIONARIES: Record<Locale, Dictionary> = { ru, en };
const CONTENT: Record<Locale, Content> = { ru: contentRu, en: contentEn };

interface LocaleContextValue {
  locale: Locale;
  /** Полный локализованный контент: профиль, проекты, задания, раздел employers. */
  content: Content;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readInitialLocale(): Locale {
  if (typeof window === 'undefined') {
    return DEFAULT_LOCALE;
  }
  // Язык из ссылки (?lang=en) важнее сохранённого: им делятся ссылкой.
  const fromQuery = new URLSearchParams(window.location.search).get('lang');
  if (isLocale(fromQuery)) {
    return fromQuery;
  }
  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return isLocale(stored) ? stored : DEFAULT_LOCALE;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    // Чтобы ссылкой можно было поделиться именно с нужным языком.
    const url = new URL(window.location.href);
    if (next === DEFAULT_LOCALE) {
      url.searchParams.delete('lang');
    } else {
      url.searchParams.set('lang', next);
    }
    window.history.replaceState(null, '', url);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'ru' ? 'en' : 'ru');
  }, [locale, setLocale]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      content: CONTENT[locale],
      t: DICTIONARIES[locale],
      setLocale,
      toggleLocale,
    }),
    [locale, setLocale, toggleLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used inside <LocaleProvider>');
  }
  return context;
}

/** Короткий доступ к словарю: const t = useT(); */
export function useT(): Dictionary {
  return useLocale().t;
}
