'use client';
import { useState } from 'react';
import * as operator from './childBmi.utils';
import * as operatorUtils from '@/features/calculators/utils';
import { useTranslation } from '@/core/i18n/useTranslation';

export default function ChildBmiCalculator() {
  const { tCalculators } = useTranslation();
  const cb = tCalculators.childBmi;

  const [age, setAge] = useState<string>('10');
  const [weight, setWeight] = useState<string>('35');
  const [height, setHeight] = useState<string>('140');
  const [gender, setGender] = useState<string>('male');
  const [result, setResult] = useState<operator.ChildBmiResult | null>(null);

  function handleCalculate(event: React.FormEvent) {
    event.preventDefault();

    const ageValue = operatorUtils.parseNumber(age);
    const weightValue = operatorUtils.parseNumber(weight);
    const heightValue = operatorUtils.parseNumber(height);

    if (!ageValue || !weightValue || !heightValue || ageValue <= 0 || weightValue <= 0 || heightValue <= 0) {
      setResult(null);
      return;
    }

    if (ageValue < 2 || ageValue > 18) {
      setResult(null);
      return;
    }

    const bmiResult = operator.calculateChildBmi(ageValue, weightValue, heightValue);
    setResult(bmiResult);
  }

  return (
    <div>
      <h2>{cb.childBmiTitle}</h2>

      <form onSubmit={handleCalculate}>
        <div className='calculator-inputs'>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="cb-age">
              {cb.childBmiAgeLabel}
            </label>
            <input
              id="cb-age"
              type="number"
              step="1"
              min="2"
              max="18"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className='calculator-input'
            />
          </div>

          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="cb-weight">
              {cb.childBmiWeightLabel} (kg)
            </label>
            <input
              id="cb-weight"
              type="number"
              step="0.1"
              min="0"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className='calculator-input'
            />
          </div>

          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="cb-height">
              {cb.childBmiHeightLabel} (cm)
            </label>
            <input
              id="cb-height"
              type="number"
              step="1"
              min="0"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className='calculator-input'
            />
          </div>

          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="cb-gender">
              {cb.childBmiGenderLabel}
            </label>
            <select
              id="cb-gender"
              className='calculator-input'
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">{cb.childBmiMaleOption}</option>
              <option value="female">{cb.childBmiFemaleOption}</option>
            </select>
          </div>
        </div>

        <div className='calculator-actions'>
          <button type="submit" className='button'>
            {cb.childBmiCalculateButton}
          </button>
        </div>
      </form>

      {result && (
        <div className='calculator-result-card'>
          <h3>{cb.childBmiResultTitle}</h3>
          <p>BMI: {result.bmi}</p>
          <p>{cb.childBmiCategory}: {result.category}</p>
        </div>
      )}
    </div>
  );
}
