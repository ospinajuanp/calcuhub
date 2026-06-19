export interface CurrencyResult {
  convertedAmount: number;
  exchangeRate: number;
}

const EXCHANGE_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  MXN: 17.15,
  COP: 3950,
  ARS: 350,
  BRL: 4.97,
};

export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): CurrencyResult {
  const fromRate = EXCHANGE_RATES[fromCurrency] || 1;
  const toRate = EXCHANGE_RATES[toCurrency] || 1;

  const amountInUSD = amount / fromRate;
  const convertedAmount = amountInUSD * toRate;
  const exchangeRate = toRate / fromRate;

  return {
    convertedAmount: Math.round(convertedAmount * 100) / 100,
    exchangeRate: Math.round(exchangeRate * 10000) / 10000,
  };
}

export function getCurrencyList(): string[] {
  return Object.keys(EXCHANGE_RATES);
}
