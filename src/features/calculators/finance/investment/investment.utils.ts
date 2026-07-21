export interface InvestmentResult {
  lumpSumFinal: number;
  lumpSumTotalContributed: number;
  lumpSumInterest: number;
  sipFinal: number;
  sipTotalContributed: number;
  sipInterest: number;
  difference: number;
  lumpSumSchedule: { month: number; value: number }[];
  sipSchedule: { month: number; value: number }[];
}

export function calculateInvestment(
  initialAmount: number,
  monthlyContribution: number,
  annualRate: number,
  years: number
): InvestmentResult {
  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = years * 12;

  let lumpSumFinal = initialAmount;
  const lumpSumSchedule: { month: number; value: number }[] = [];
  for (let month = 1; month <= totalMonths; month++) {
    lumpSumFinal = lumpSumFinal * (1 + monthlyRate);
    lumpSumSchedule.push({ month, value: Math.round(lumpSumFinal * 100) / 100 });
  }
  const lumpSumTotalContributed = initialAmount;
  const lumpSumInterest = lumpSumFinal - lumpSumTotalContributed;

  let sipFinal = 0;
  const sipSchedule: { month: number; value: number }[] = [];
  for (let month = 1; month <= totalMonths; month++) {
    sipFinal = (sipFinal + monthlyContribution) * (1 + monthlyRate);
    if (month % 12 === 0) {
      sipSchedule.push({ month, value: Math.round(sipFinal * 100) / 100 });
    }
  }
  const sipTotalContributed = monthlyContribution * totalMonths;
  const sipInterest = sipFinal - sipTotalContributed;

  return {
    lumpSumFinal: Math.round(lumpSumFinal * 100) / 100,
    lumpSumTotalContributed: Math.round(lumpSumTotalContributed * 100) / 100,
    lumpSumInterest: Math.round(lumpSumInterest * 100) / 100,
    sipFinal: Math.round(sipFinal * 100) / 100,
    sipTotalContributed: Math.round(sipTotalContributed * 100) / 100,
    sipInterest: Math.round(sipInterest * 100) / 100,
    difference: Math.round((sipFinal - lumpSumFinal) * 100) / 100,
    lumpSumSchedule,
    sipSchedule,
  };
}
