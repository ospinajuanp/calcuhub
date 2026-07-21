export interface DogAgeResult {
  humanYears: number;
  dogYears: number;
  lifeStage: string;
}

export function calculateDogAge(dogAgeYears: number): DogAgeResult {
  let humanYears: number;

  if (dogAgeYears <= 0) {
    humanYears = 0;
  } else if (dogAgeYears <= 1) {
    humanYears = dogAgeYears * 15;
  } else if (dogAgeYears <= 2) {
    humanYears = 15 + (dogAgeYears - 1) * 9;
  } else {
    humanYears = 24 + (dogAgeYears - 2) * 4;
  }

  let lifeStage: string;
  if (dogAgeYears < 0.5) {
    lifeStage = 'puppy';
  } else if (dogAgeYears < 1) {
    lifeStage = 'young';
  } else if (dogAgeYears < 7) {
    lifeStage = 'adult';
  } else {
    lifeStage = 'senior';
  }

  return {
    humanYears: Math.round(humanYears * 10) / 10,
    dogYears: dogAgeYears,
    lifeStage,
  };
}
