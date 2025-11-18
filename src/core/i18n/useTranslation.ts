// src/core/i18n/useTranslation.ts
import { useLanguage } from './LanguageContext';

export function useTranslation() {
  const { dictionary } = useLanguage();

  return {
    tCommon: dictionary.common,
    tCategories: dictionary.categories,
    tCalculators: dictionary.calculators,
  };
}
