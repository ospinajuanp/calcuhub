export function calculateImc(weightKg: number, heightCm: number): number {
  const heightMeters = heightCm / 100;
  const bmiValue = weightKg / (heightMeters * heightMeters);
  return Math.round(bmiValue * 10) / 10;
}

export type ImcCategoryKey = 'underweight' | 'normal' | 'overweight' | 'obesity';

export function getImcCategoryKey(imc: number): ImcCategoryKey {
  if (imc < 18.5) return 'underweight';
  if (imc < 24.9) return 'normal';
  if (imc < 29.9) return 'overweight';
  return 'obesity';
}