export interface TipsResult {
  tipAmount: number;
  totalAmount: number;
  perPerson: number;
}

export function calculateTips(
  billAmount: number,
  tipPercentage: number,
  numberOfPeople: number
): TipsResult {
  const tipAmount = billAmount * (tipPercentage / 100);
  const totalAmount = billAmount + tipAmount;
  const perPerson = numberOfPeople > 0 ? totalAmount / numberOfPeople : totalAmount;

  return {
    tipAmount: Math.round(tipAmount * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
    perPerson: Math.round(perPerson * 100) / 100,
  };
}
