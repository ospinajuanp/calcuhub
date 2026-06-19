export interface SleepResult {
  recommendedHours: number;
  sleepDebt: number;
  optimalBedtime: string;
  optimalWakeup: string;
}

export function calculateSleep(
  age: number,
  wakeUpTime: string,
  currentSleepHours: number
): SleepResult {
  let recommendedHours: number;

  if (age >= 18) {
    recommendedHours = 8;
  } else if (age >= 14) {
    recommendedHours = 9;
  } else if (age >= 11) {
    recommendedHours = 10;
  } else if (age >= 6) {
    recommendedHours = 11;
  } else if (age >= 3) {
    recommendedHours = 12;
  } else {
    recommendedHours = 14;
  }

  const sleepDebt = Math.max(0, recommendedHours - currentSleepHours);

  const [hours, minutes] = wakeUpTime.split(':').map(Number);
  const wakeUpDate = new Date();
  wakeUpDate.setHours(hours, minutes, 0);

  const bedtimeDate = new Date(wakeUpDate);
  bedtimeDate.setHours(bedtimeDate.getHours() - recommendedHours);

  const optimalBedtime = `${bedtimeDate.getHours().toString().padStart(2, '0')}:${bedtimeDate.getMinutes().toString().padStart(2, '0')}`;
  const optimalWakeup = wakeUpTime;

  return {
    recommendedHours,
    sleepDebt: Math.round(sleepDebt * 10) / 10,
    optimalBedtime,
    optimalWakeup,
  };
}
