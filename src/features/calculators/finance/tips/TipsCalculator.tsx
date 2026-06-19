'use client';
import { useState } from 'react';
import * as operator from './tips.utils';
import * as operatorUtils from '@/features/calculators/utils';
import { useTranslation } from '@/core/i18n/useTranslation';

export default function TipsCalculator() {
  const { tCalculators } = useTranslation();
  const tp = tCalculators.tips;

  const [billAmount, setBillAmount] = useState<string>('100');
  const [tipPercentage, setTipPercentage] = useState<string>('15');
  const [numberOfPeople, setNumberOfPeople] = useState<string>('1');
  const [result, setResult] = useState<operator.TipsResult | null>(null);

  function handleCalculate(event: React.FormEvent) {
    event.preventDefault();

    const billValue = operatorUtils.parseNumber(billAmount);
    const tipValue = operatorUtils.parseNumber(tipPercentage);
    const peopleValue = operatorUtils.parseNumber(numberOfPeople);

    if (!billValue || !tipValue || !peopleValue || peopleValue <= 0) {
      setResult(null);
      return;
    }

    const tipsResult = operator.calculateTips(billValue, tipValue, peopleValue);
    setResult(tipsResult);
  }

  return (
    <div>
      <h2>{tp.tipsTitle}</h2>

      <form onSubmit={handleCalculate}>
        <div className='calculator-inputs'>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="tips-amount">
              {tp.tipsAmount}
            </label>
            <input
              id="tips-amount"
              type="number"
              step="0.01"
              min="0"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              placeholder="100"
              className='calculator-input'
            />
          </div>

          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="tips-percentage">
              {tp.tipsPercentage}
            </label>
            <input
              id="tips-percentage"
              type="number"
              step="1"
              min="0"
              value={tipPercentage}
              onChange={(e) => setTipPercentage(e.target.value)}
              placeholder="15"
              className='calculator-input'
            />
          </div>

          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="tips-people">
              {tp.tipsPeople}
            </label>
            <input
              id="tips-people"
              type="number"
              step="1"
              min="1"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(e.target.value)}
              placeholder="1"
              className='calculator-input'
            />
          </div>
        </div>

        <div className='calculator-actions'>
          <button type="submit" className='button'>
            {tp.tipsCalculateButton}
          </button>
        </div>
      </form>

      {result && (
        <div className='calculator-result-card'>
          <h3>{tp.tipsResultTitle}</h3>
          <p>{tp.tipsTipAmount}: {result.tipAmount.toFixed(2)}</p>
          <p>{tp.tipsTotalAmount}: {result.totalAmount.toFixed(2)}</p>
          <p>{tp.tipsPerPerson}: {result.perPerson.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
