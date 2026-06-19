export interface TdeeResult {
  tdee: number;
  maintainWeight: number;
  loseWeight: number;
  gainWeight: number;
}

export function calculateTdee(
  weight: number,
  height: number,
  age: number,
  gender: string,
  activityLevel: number
): TdeeResult {
  let bmr: number;

  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const tdee = Math.round(bmr * activityLevel);

  return {
    tdee,
    maintainWeight: tdee,
    loseWeight: Math.round(tdee * 0.8),
    gainWeight: Math.round(tdee * 1.2),
  };
}
