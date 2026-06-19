export interface PercentageResult {
  percentageValue: number;
  percentageOf: number;
  whatPercent: number;
}

export function calculatePercentageOf(value: number, percentage: number): number {
  return Math.round(value * (percentage / 100) * 100) / 100;
}

export function calculateWhatPercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 10000) / 100;
}

export function calculatePercentageIncrease(initial: number, final: number): number {
  if (initial === 0) return 0;
  return Math.round(((final - initial) / initial) * 10000) / 100;
}
