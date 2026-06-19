// src/core/ui/iconRegistry.ts
import type { LucideIcon } from 'lucide-react';
import {
  HeartPulse,
  Wallet,
  BicepsFlexed,
  GlassWater,
  BanknoteArrowDown,
  BanknoteArrowUp,
  Calculator,
  Globe,
  Github,
  Linkedin,
  Percent,
  CalendarDays,
  CalendarRange,
  Home,
  Coins,
  Tag,
  Flame,
  CalendarHeart,
  Moon,
  Baby,
  PiggyBank,
  Currency,
  Ruler,
  Gauge,
  GraduationCap,
} from 'lucide-react';



// TODOS los ids de iconos que vas a usar en la app
export type AppIconId =
  | 'calculator'
  // categorías
  | 'health'
  | 'finance'
  | 'date'
  | 'utilities'
  // calculadoras
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

  // redes sociales
  | 'socialLinkedin'
  | 'socialGithub'
  | 'socialPortfolio';

// Registry tipado: para cualquier AppIconId tienes un LucideIcon
export const iconRegistry: Record<AppIconId, LucideIcon> = {
  calculator: Calculator,

  // Categorías
  health: HeartPulse,
  finance: Wallet,
  date: CalendarRange,
  utilities: Gauge,

  // Calculadoras - Health
  imc: HeartPulse,
  tmb: BicepsFlexed,
  waterIntake: GlassWater,
  tdee: Flame,
  ovulation: CalendarHeart,
  sleep: Moon,
  childBmi: Baby,

  // Calculadoras - Finance
  compoundInterest: BanknoteArrowUp,
  loanPayments: BanknoteArrowDown,
  tax: Percent,
  mortgage: Home,
  tips: Coins,
  discount: Tag,
  savings: PiggyBank,
  currency: Currency,

  // Calculadoras - Date
  exactAge: CalendarDays,
  dateDiff: CalendarRange,

  // Calculadoras - Utilities
  units: Ruler,
  percentage: Percent,
  speed: Gauge,
  grades: GraduationCap,

  // Redes
  socialLinkedin: Linkedin,
  socialGithub: Github,
  socialPortfolio: Globe,
};
