'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import { DEFAULT_LOCALE, type Locale } from './locales';
import { getDictionary, type Dictionary } from './dictionaries';

interface LanguageContextValue {
  locale: Locale;
  dictionary: Dictionary;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('calcuhub-locale') as Locale;
      if (savedLocale && ['es', 'en', 'pt'].includes(savedLocale)) {
        return savedLocale;
      }
    }
    return DEFAULT_LOCALE;
  });

  const dictionary = useMemo(() => getDictionary(locale), [locale]);

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('calcuhub-locale', newLocale);
    }
  };

  const value: LanguageContextValue = {
    locale,
    dictionary,
    setLocale: handleSetLocale,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage debe usarse dentro de LanguageProvider');
  }
  return ctx;
}
