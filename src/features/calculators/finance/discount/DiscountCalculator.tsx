'use client';
import { useState } from 'react';
import * as operator from './discount.utils';
import * as operatorUtils from '@/features/calculators/utils';
import { useTranslation } from '@/core/i18n/useTranslation';

export default function DiscountCalculator() {
  const { tCalculators } = useTranslation();
  const dc = tCalculators.discount;

  const [originalPrice, setOriginalPrice] = useState<string>('100');
  const [discountPercentage, setDiscountPercentage] = useState<string>('20');
  const [result, setResult] = useState<operator.DiscountResult | null>(null);

  function handleCalculate(event: React.FormEvent) {
    event.preventDefault();

    const priceValue = operatorUtils.parseNumber(originalPrice);
    const discountValue = operatorUtils.parseNumber(discountPercentage);

    if (!priceValue || !discountValue || discountValue < 0 || discountValue > 100) {
      setResult(null);
      return;
    }

    const discountResult = operator.calculateDiscount(priceValue, discountValue);
    setResult(discountResult);
  }

  return (
    <div>
      <h2>{dc.discountTitle}</h2>

      <form onSubmit={handleCalculate}>
        <div className='calculator-inputs'>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="dc-price">
              {dc.discountPrice}
            </label>
            <input
              id="dc-price"
              type="number"
              step="0.01"
              min="0"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="100"
              className='calculator-input'
            />
          </div>

          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="dc-percentage">
              {dc.discountPercentage}
            </label>
            <input
              id="dc-percentage"
              type="number"
              step="1"
              min="0"
              max="100"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(e.target.value)}
              placeholder="20"
              className='calculator-input'
            />
          </div>
        </div>

        <div className='calculator-actions'>
          <button type="submit" className='button'>
            {dc.discountCalculateButton}
          </button>
        </div>
      </form>

      {result && (
        <div className='calculator-result-card'>
          <h3>{dc.discountResultTitle}</h3>
          <p>{dc.discountSavings}: {result.discountAmount.toFixed(2)}</p>
          <p>{dc.discountFinalPrice}: {result.finalPrice.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
