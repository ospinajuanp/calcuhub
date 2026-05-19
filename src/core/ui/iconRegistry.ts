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
  CalendarRange ,
} from 'lucide-react';



// TODOS los ids de iconos que vas a usar en la app
export type AppIconId =
  | 'calculator'
  // categorías
  | 'health'
  | 'finance'
  | 'date'
  // calculadoras
  | 'imc'
  | 'tmb'
  | 'waterIntake'
  | 'compoundInterest'
  | 'loanPayments'
  | 'tax'
  // date
  | 'exactAge'

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

  // Calculadoras
  imc: HeartPulse,
  tmb: BicepsFlexed,
  waterIntake: GlassWater,
  compoundInterest: BanknoteArrowUp,
  loanPayments: BanknoteArrowDown,
  tax :Percent,

  // Date
  exactAge:CalendarDays,

  // Redes
  socialLinkedin: Linkedin,
  socialGithub: Github,
  socialPortfolio: Globe,
};
