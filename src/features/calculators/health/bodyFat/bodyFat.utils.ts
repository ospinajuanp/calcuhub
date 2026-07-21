export interface BodyFatResult {
  bodyFatPercentage: number;
  category: string;
  fatMass: number;
  leanMass: number;
}

export function calculateBodyFat(
  gender: 'male' | 'female',
  weight: number,
  height: number,
  age: number,
  waist: number,
  neck: number,
  hip?: number
): BodyFatResult {
  let bodyFat: number;

  const heightCm = height * 2.54;
  const waistCm = waist * 2.54;
  const neckCm = neck * 2.54;
  const hipCm = hip ? hip * 2.54 : 0;

  if (gender === 'male') {
    bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450;
  } else {
    bodyFat = 495 / (1.2959 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(heightCm)) - 450;
  }

  bodyFat = Math.max(2, Math.min(60, bodyFat));

  const fatMass = (weight * bodyFat) / 100;
  const leanMass = weight - fatMass;

  let category: string;
  if (gender === 'male') {
    if (bodyFat < 6) category = 'essential';
    else if (bodyFat < 14) category = 'athlete';
    else if (bodyFat < 18) category = 'fitness';
    else if (bodyFat < 25) category = 'average';
    else category = 'obese';
  } else {
    if (bodyFat < 14) category = 'essential';
    else if (bodyFat < 21) category = 'athlete';
    else if (bodyFat < 25) category = 'fitness';
    else if (bodyFat < 32) category = 'average';
    else category = 'obese';
  }

  return {
    bodyFatPercentage: Math.round(bodyFat * 10) / 10,
    category,
    fatMass: Math.round(fatMass * 10) / 10,
    leanMass: Math.round(leanMass * 10) / 10,
  };
}
