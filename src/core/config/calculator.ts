// src/core/config/calculators.ts
import type { CategoryId } from './categories';
import type { AppIconId } from '../ui/iconRegistry';

export type CalculatorId =
  | 'imc'
  | 'tmb'
  | 'waterIntake'
  | 'compoundInterest'
  | 'loanPayments';



export interface CalculatorConfig {
  id: CalculatorId;
  slug: string;
  categoryId: CategoryId;
  iconId: AppIconId;
  i18nKey: `calculators.${CalculatorId}`;
  featured?: boolean; // para saber si mostrarla en Home
}

export const calculatorsConfig: CalculatorConfig[] = [
  {
    id: 'imc',
    slug: 'imc',
    categoryId: 'health',
    iconId: 'imc',
    i18nKey: 'calculators.imc',
    featured: true,
  },
  {
    id: 'tmb',
    slug: 'tmb',
    categoryId: 'health',
    iconId: 'tmb',
    i18nKey: 'calculators.tmb',
    featured: false,
  },
  {
    id: 'waterIntake',
    slug: 'waterIntake',
    categoryId: 'health',
    iconId: 'waterIntake',
    i18nKey: 'calculators.waterIntake',
    featured: false,
    
  },
  {
    id: 'compoundInterest',
    slug: 'compoundInterest',
    categoryId: 'finance',
    iconId: 'compoundInterest',
    i18nKey: 'calculators.compoundInterest',
    featured: true,
  },
  {
    id: 'loanPayments',
    slug: 'loanPayments',
    categoryId: 'finance',
    iconId: 'loanPayments',
    i18nKey: 'calculators.loanPayments',
    featured: true,
  },
];

export function getCalculatorBySlug(
  slug: string
): CalculatorConfig | undefined {
  return calculatorsConfig.find((c) => c.slug === slug);
}