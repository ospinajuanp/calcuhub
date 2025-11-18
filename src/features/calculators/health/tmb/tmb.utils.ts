export function calculateTmb(weight: number, height: number, age: number, gender: string): number {
  if (gender.toLowerCase() === 'male') {
    return 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
  } else {
    return 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
  }
}

export function formatTmbResult(tmb: number): string {
  return `${tmb.toFixed(2)} kcal/day`;
}