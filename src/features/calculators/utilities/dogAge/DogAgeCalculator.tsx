'use client';
import { useState } from 'react';
import * as dog from './dogAge.utils';
import { useTranslation } from '@/core/i18n/useTranslation';

export default function DogAgeCalculator() {
  const { tCalculators } = useTranslation();
  const t = tCalculators.dogAge;

  const [dogAge, setDogAge] = useState<string>('');
  const [result, setResult] = useState<dog.DogAgeResult | null>(null);

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    const age = parseFloat(dogAge);
    if (isNaN(age) || age < 0) {
      setResult(null);
      return;
    }
    setResult(dog.calculateDogAge(age));
  }

  return (
    <div>
      <form onSubmit={handleCalculate}>
        <div className='calculator-inputs'>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="dog-age">
              {t.dogAgeLabel}
            </label>
            <input
              id="dog-age"
              type="number"
              step="0.1"
              min="0"
              value={dogAge}
              onChange={(e) => setDogAge(e.target.value)}
              placeholder="3"
              className='calculator-input'
            />
          </div>
        </div>
        <div className='calculator-actions'>
          <button type="submit" className='button'>
            {t.dogAgeCalculateButton}
          </button>
        </div>
      </form>
      {result && (
        <div className='calculator-result-card'>
          <h3>{t.dogAgeResultTitle}</h3>
          <p>{t.dogAgeHumanYears}: {result.humanYears}</p>
          <p>{t.dogAgeLifeStage}: {t[`dogAge${result.lifeStage.charAt(0).toUpperCase() + result.lifeStage.slice(1)}Stage` as keyof typeof t]}</p>
        </div>
      )}
    </div>
  );
}
