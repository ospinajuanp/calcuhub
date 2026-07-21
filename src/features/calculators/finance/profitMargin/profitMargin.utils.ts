export interface ProfitMarginResult {
  grossMargin: number;
  netMargin: number;
  grossProfit: number;
  netProfit: number;
}

export function calculateProfitMargin(
  revenue: number,
  cogs: number,
  expenses: number
): ProfitMarginResult {
  const grossProfit = revenue - cogs;
  const grossMargin = revenue > 0 ? (grossProfit / revenue) * 100 : 0;
  const netProfit = grossProfit - expenses;
  const netMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0;
  return {
    grossMargin: Math.round(grossMargin * 100) / 100,
    netMargin: Math.round(netMargin * 100) / 100,
    grossProfit: Math.round(grossProfit * 100) / 100,
    netProfit: Math.round(netProfit * 100) / 100,
  };
}
