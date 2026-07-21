export interface RoiResult {
  roi: number;
  totalReturn: number;
  netProfit: number;
}

export function calculateRoi(
  initialInvestment: number,
  finalValue: number
): RoiResult {
  const netProfit = finalValue - initialInvestment;
  const roi = initialInvestment > 0 ? (netProfit / initialInvestment) * 100 : 0;
  return {
    roi: Math.round(roi * 100) / 100,
    totalReturn: Math.round(finalValue * 100) / 100,
    netProfit: Math.round(netProfit * 100) / 100,
  };
}
