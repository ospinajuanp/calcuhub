// src/core/config/categories.ts
import type { AppIconId } from '../ui/iconRegistry';

export type CategoryId = 'health' | 'finance' | 'date' | 'utilities';

export interface CategoryConfig {
  id: CategoryId;
  slug: string;
  iconId: AppIconId;
  i18nKey: `categories.${CategoryId}`;
}

export const categoriesConfig: CategoryConfig[] = [
  {
    id: 'health',
    slug: 'health',
    iconId: 'health',
    i18nKey: 'categories.health',
  },
  {
    id: 'finance',
    slug: 'finance',
    iconId: 'finance',
    i18nKey: 'categories.finance',
  },
  {
    id: 'date',
    slug: 'date',
    iconId: 'date',
    i18nKey: 'categories.date',
  },
  {
    id: 'utilities',
    slug: 'utilities',
    iconId: 'utilities',
    i18nKey: 'categories.utilities',
  },
];


export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
  return categoriesConfig.find((c) => c.slug === slug);
}