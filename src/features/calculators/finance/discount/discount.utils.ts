export interface DiscountResult {
  discountAmount: number;
  finalPrice: number;
  savingsPercentage: number;
}

export function calculateDiscount(
  originalPrice: number,
  discountPercentage: number
): DiscountResult {
  const discountAmount = originalPrice * (discountPercentage / 100);
  const finalPrice = originalPrice - discountAmount;
  const savingsPercentage = discountPercentage;

  return {
    discountAmount: Math.round(discountAmount * 100) / 100,
    finalPrice: Math.round(finalPrice * 100) / 100,
    savingsPercentage: Math.round(savingsPercentage * 100) / 100,
  };
}
