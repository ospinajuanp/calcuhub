export interface SavingsResult {
  futureValue: number;
  totalContributions: number;
  totalInterest: number;
}

export function calculateSavings(
  initialAmount: number,
  monthlyContribution: number,
  annualRate: number,
  years: number
): SavingsResult {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfMonths = years * 12;

  let futureValue = initialAmount * Math.pow(1 + monthlyRate, numberOfMonths);

  if (monthlyRate > 0) {
    const contributionFutureValue = monthlyContribution *
      ((Math.pow(1 + monthlyRate, numberOfMonths) - 1) / monthlyRate);
    futureValue += contributionFutureValue;
  } else {
    futureValue += monthlyContribution * numberOfMonths;
  }

  const totalContributions = initialAmount + (monthlyContribution * numberOfMonths);
  const totalInterest = futureValue - totalContributions;

  return {
    futureValue: Math.round(futureValue * 100) / 100,
    totalContributions: Math.round(totalContributions * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
  };
}
