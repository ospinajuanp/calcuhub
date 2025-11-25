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
} from 'lucide-react';

// TODOS los ids de iconos que vas a usar en la app
export type AppIconId =
  | 'calculator'
  // categorías
  | 'health'
  | 'finance'
  // calculadoras
  | 'imc'
  | 'tmb'
  | 'waterIntake'
  | 'compoundInterest'
  | 'loanPayments'
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

  // Calculadoras
  imc: HeartPulse,
  tmb: BicepsFlexed,
  waterIntake: GlassWater,
  compoundInterest: BanknoteArrowUp,
  loanPayments: BanknoteArrowDown,

  // Redes
  socialLinkedin: Linkedin,
  socialGithub: Github,
  socialPortfolio: Globe,
};
