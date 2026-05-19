export interface ExactAgeResult {
  years: number;
  months: number;
  days: number;
}

export function calculateExactAge(birthDate: Date, currentDate: Date): ExactAgeResult {
  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();
  let days = currentDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}