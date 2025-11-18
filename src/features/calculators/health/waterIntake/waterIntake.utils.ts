export function calculateWaterIntake(weight: number, gender: string): Array<number> {
    let minIntake: number;
    let maxIntake: number;
    if (gender.toLowerCase() === 'male') {
        minIntake = weight * 35; // ml per kg
        maxIntake = weight * 40; // ml per kg
    } else {
        minIntake = weight * 30; // ml per kg
        maxIntake = weight * 35; // ml per kg
    }
    return [minIntake, maxIntake];
}

export function formatWaterIntakeResult(intake: number): string {
  return `${(intake / 1000).toFixed(2)} liters/day`;
}   