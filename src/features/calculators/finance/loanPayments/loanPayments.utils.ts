import * as operatorUniversal from '@/features/calculators/utils'

export function calculateLoanPayments (amount:number, interestRage:number, numberLoanYear:number, termYears:number){
    const rate = operatorUniversal.percentage(interestRage);

    const ratePeriod = rate / numberLoanYear;
    const numberLoan = numberLoanYear * termYears;
    const rawAmount = amount * (ratePeriod * (1 + ratePeriod) ** numberLoan) / ((1 + ratePeriod) ** numberLoan - 1);
    
    const roundedAmount = Math.round(rawAmount * 100) / 100;

    return roundedAmount;
}