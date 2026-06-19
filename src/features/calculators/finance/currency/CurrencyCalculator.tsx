'use client';
import { useState } from 'react';
import * as operator from './currency.utils';
import * as operatorUtils from '@/features/calculators/utils';
import { useTranslation } from '@/core/i18n/useTranslation';

const CURRENCIES = ['USD', 'EUR', 'GBP', 'MXN', 'COP', 'ARS', 'BRL'];

export default function CurrencyCalculator() {
  const { tCalculators } = useTranslation();
  const cu = tCalculators.currency;

  const [amount, setAmount] = useState<string>('100');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [result, setResult] = useState<operator.CurrencyResult | null>(null);

  function handleCalculate(event: React.FormEvent) {
    event.preventDefault();

    const amountValue = operatorUtils.parseNumber(amount);

    if (!amountValue || amountValue <= 0) {
      setResult(null);
      return;
    }

    const currencyResult = operator.convertCurrency(amountValue, fromCurrency, toCurrency);
    setResult(currencyResult);
  }

  return (
    <div>
      <h2>{cu.currencyTitle}</h2>

      <form onSubmit={handleCalculate}>
        <div className='calculator-inputs'>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="cu-amount">
              {cu.currencyAmount}
            </label>
            <input
              id="cu-amount"
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className='calculator-input'
            />
          </div>

          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="cu-from">
              {cu.currencyFrom}
            </label>
            <select
              id="cu-from"
              className='calculator-input'
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {CURRENCIES.map((curr) => (
                <option key={curr} value={curr}>{curr}</option>
              ))}
            </select>
          </div>

          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="cu-to">
              {cu.currencyTo}
            </label>
            <select
              id="cu-to"
              className='calculator-input'
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {CURRENCIES.map((curr) => (
                <option key={curr} value={curr}>{curr}</option>
              ))}
            </select>
          </div>
        </div>

        <div className='calculator-actions'>
          <button type="submit" className='button'>
            {cu.currencyCalculateButton}
          </button>
        </div>
      </form>

      {result && (
        <div className='calculator-result-card'>
          <h3>{cu.currencyResultTitle}</h3>
          <p>{cu.currencyConverted}: {result.convertedAmount.toFixed(2)} {toCurrency}</p>
          <p>{cu.currencyRate}: 1 {fromCurrency} = {result.exchangeRate} {toCurrency}</p>
        </div>
      )}
    </div>
  );
}
