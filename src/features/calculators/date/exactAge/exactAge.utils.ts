import * as operatorUniversal from '@/features/calculators/utils'

export function calculateCompoundInterest(
  capital: number,
  interestRate: number,
  capitalizationFrequency: number,
  years: number
) {
  const rate = operatorUniversal.percentage(interestRate);

  const rawAmount =
    capital * (1 + rate / capitalizationFrequency) **
    (capitalizationFrequency * years);

  // Redondear a 2 decimales
  const roundedAmount = Math.round(rawAmount * 100) / 100;

  return roundedAmount;
}



export function calculateInterestGenerated(capital:number, compoundInterest:number){

    return compoundInterest - capital

}

