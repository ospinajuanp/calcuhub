// src/core/i18n/dictionaries/index.ts
import { esDictionary } from './es';
import { enDictionary } from './en';
import { ptDictionary } from './pt';
import type { Locale } from '../locales';

export type Dictionary = typeof esDictionary;

const dictionaries: Record<Locale, Dictionary> = {
  es: esDictionary,
  en: enDictionary,
  pt: ptDictionary,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? esDictionary;
}
