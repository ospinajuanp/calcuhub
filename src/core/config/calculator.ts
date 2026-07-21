// src/core/config/calculators.ts
import type { CategoryId } from './categories';
import type { AppIconId } from '../ui/iconRegistry';

export type CalculatorId =
  | 'imc'
  | 'tmb'
  | 'waterIntake'
  | 'compoundInterest'
  | 'loanPayments'
  | 'tax'
  | 'exactAge'
  | 'mortgage'
  | 'tips'
  | 'discount'
  | 'tdee'
  | 'ovulation'
  | 'sleep'
  | 'childBmi'
  | 'savings'
  | 'currency'
  | 'dateDiff'
  | 'units'
  | 'percentage'
  | 'speed'
  | 'grades'
  | 'roi'
  | 'profitMargin'
  | 'bloodPressure'
  | 'heartRate'
  | 'temperature'
  | 'dogAge'
  | 'area'
  | 'dueDate'
  | 'bodyFat'
  | 'time'
  | 'amortization'
  | 'investment';



export interface CalculatorConfig {
  id: CalculatorId;
  slug: string;
  categoryId: CategoryId;
  iconId: AppIconId;
  i18nKey: `calculators.${CalculatorId}`;
  featured?: boolean;
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
    id: 'tdee',
    slug: 'tdee',
    categoryId: 'health',
    iconId: 'tdee',
    i18nKey: 'calculators.tdee',
    featured: true,
  },
  {
    id: 'ovulation',
    slug: 'ovulation',
    categoryId: 'health',
    iconId: 'ovulation',
    i18nKey: 'calculators.ovulation',
    featured: false,
  },
  {
    id: 'sleep',
    slug: 'sleep',
    categoryId: 'health',
    iconId: 'sleep',
    i18nKey: 'calculators.sleep',
    featured: false,
  },
  {
    id: 'childBmi',
    slug: 'childBmi',
    categoryId: 'health',
    iconId: 'childBmi',
    i18nKey: 'calculators.childBmi',
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
  {
    id: 'tax',
    slug: 'tax',
    categoryId: 'finance',
    iconId: 'tax',
    i18nKey: 'calculators.tax',
    featured: true,
  },
  {
    id: 'mortgage',
    slug: 'mortgage',
    categoryId: 'finance',
    iconId: 'mortgage',
    i18nKey: 'calculators.mortgage',
    featured: false,
  },
  {
    id: 'tips',
    slug: 'tips',
    categoryId: 'finance',
    iconId: 'tips',
    i18nKey: 'calculators.tips',
    featured: false,
  },
  {
    id: 'discount',
    slug: 'discount',
    categoryId: 'finance',
    iconId: 'discount',
    i18nKey: 'calculators.discount',
    featured: false,
  },
  {
    id: 'savings',
    slug: 'savings',
    categoryId: 'finance',
    iconId: 'savings',
    i18nKey: 'calculators.savings',
    featured: false,
  },
  {
    id: 'currency',
    slug: 'currency',
    categoryId: 'finance',
    iconId: 'currency',
    i18nKey: 'calculators.currency',
    featured: false,
  },
  {
    id: 'exactAge',
    slug: 'exactAge',
    categoryId: 'date',
    iconId: 'exactAge',
    i18nKey: 'calculators.exactAge',
    featured: true,
  },
  {
    id: 'dateDiff',
    slug: 'dateDiff',
    categoryId: 'date',
    iconId: 'dateDiff',
    i18nKey: 'calculators.dateDiff',
    featured: false,
  },
  {
    id: 'units',
    slug: 'units',
    categoryId: 'utilities',
    iconId: 'units',
    i18nKey: 'calculators.units',
    featured: true,
  },
  {
    id: 'percentage',
    slug: 'percentage',
    categoryId: 'utilities',
    iconId: 'percentage',
    i18nKey: 'calculators.percentage',
    featured: false,
  },
  {
    id: 'speed',
    slug: 'speed',
    categoryId: 'utilities',
    iconId: 'speed',
    i18nKey: 'calculators.speed',
    featured: false,
  },
  {
    id: 'grades',
    slug: 'grades',
    categoryId: 'utilities',
    iconId: 'grades',
    i18nKey: 'calculators.grades',
    featured: false,
  },
  {
    id: 'roi',
    slug: 'roi',
    categoryId: 'finance',
    iconId: 'roi',
    i18nKey: 'calculators.roi',
    featured: true,
  },
  {
    id: 'profitMargin',
    slug: 'profitMargin',
    categoryId: 'finance',
    iconId: 'profitMargin',
    i18nKey: 'calculators.profitMargin',
    featured: false,
  },
  {
    id: 'bloodPressure',
    slug: 'bloodPressure',
    categoryId: 'health',
    iconId: 'bloodPressure',
    i18nKey: 'calculators.bloodPressure',
    featured: true,
  },
  {
    id: 'heartRate',
    slug: 'heartRate',
    categoryId: 'health',
    iconId: 'heartRate',
    i18nKey: 'calculators.heartRate',
    featured: false,
  },
  {
    id: 'temperature',
    slug: 'temperature',
    categoryId: 'utilities',
    iconId: 'temperature',
    i18nKey: 'calculators.temperature',
    featured: false,
  },
  {
    id: 'dogAge',
    slug: 'dogAge',
    categoryId: 'utilities',
    iconId: 'dogAge',
    i18nKey: 'calculators.dogAge',
    featured: false,
  },
  {
    id: 'area',
    slug: 'area',
    categoryId: 'utilities',
    iconId: 'area',
    i18nKey: 'calculators.area',
    featured: false,
  },
  {
    id: 'dueDate',
    slug: 'dueDate',
    categoryId: 'health',
    iconId: 'dueDate',
    i18nKey: 'calculators.dueDate',
    featured: false,
  },
  {
    id: 'bodyFat',
    slug: 'bodyFat',
    categoryId: 'health',
    iconId: 'bodyFat',
    i18nKey: 'calculators.bodyFat',
    featured: false,
  },
  {
    id: 'time',
    slug: 'time',
    categoryId: 'utilities',
    iconId: 'time',
    i18nKey: 'calculators.time',
    featured: false,
  },
  {
    id: 'amortization',
    slug: 'amortization',
    categoryId: 'finance',
    iconId: 'amortization',
    i18nKey: 'calculators.amortization',
    featured: false,
  },
  {
    id: 'investment',
    slug: 'investment',
    categoryId: 'finance',
    iconId: 'investment',
    i18nKey: 'calculators.investment',
    featured: false,
  },
];

export function getCalculatorBySlug(
  slug: string
): CalculatorConfig | undefined {
  return calculatorsConfig.find((c) => c.slug === slug);
}