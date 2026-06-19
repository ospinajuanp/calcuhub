'use client';
import { useState } from 'react';
import * as operator from './tdee.utils';
import * as operatorUtils from '@/features/calculators/utils';
import { useTranslation } from '@/core/i18n/useTranslation';

const ACTIVITY_LEVELS = [
  { value: 1.2, label: 'Sedentary' },
  { value: 1.375, label: 'Light activity' },
  { value: 1.55, label: 'Moderate activity' },
  { value: 1.725, label: 'Very active' },
  { value: 1.9, label: 'Extra active' },
];

export default function TdeeCalculator() {
  const { tCalculators } = useTranslation();
  const td = tCalculators.tdee;

  const [weight, setWeight] = useState<string>('70');
  const [height, setHeight] = useState<string>('170');
  const [age, setAge] = useState<string>('30');
  const [gender, setGender] = useState<string>('male');
  const [activityLevel, setActivityLevel] = useState<string>('1.55');
  const [result, setResult] = useState<operator.TdeeResult | null>(null);

  function handleCalculate(event: React.FormEvent) {
    event.preventDefault();

    const weightValue = operatorUtils.parseNumber(weight);
    const heightValue = operatorUtils.parseNumber(height);
    const ageValue = operatorUtils.parseNumber(age);
    const activityValue = operatorUtils.parseNumber(activityLevel);

    if (!weightValue || !heightValue || !ageValue || !activityValue) {
      setResult(null);
      return;
    }

    const tdeeResult = operator.calculateTdee(weightValue, heightValue, ageValue, gender, activityValue);
    setResult(tdeeResult);
  }

  return (
    <div>
      <h2>{td.tdeeTitle}</h2>

      <form onSubmit={handleCalculate}>
        <div className='calculator-inputs'>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="tdee-weight">
              {td.tdeeWeightLabel} (kg)
            </label>
            <input
              id="tdee-weight"
              type="number"
              step="0.1"
              min="0"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className='calculator-input'
            />
          </div>

          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="tdee-height">
              {td.tdeeHeightLabel} (cm)
            </label>
            <input
              id="tdee-height"
              type="number"
              step="1"
              min="0"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className='calculator-input'
            />
          </div>

          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="tdee-age">
              {td.tdeeAgeLabel}
            </label>
            <input
              id="tdee-age"
              type="number"
              step="1"
              min="0"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className='calculator-input'
            />
          </div>

          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="tdee-gender">
              {td.tdeeGenderLabel}
            </label>
            <select
              id="tdee-gender"
              className='calculator-input'
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">{td.tdeeMaleOption}</option>
              <option value="female">{td.tdeeFemaleOption}</option>
            </select>
          </div>

          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="tdee-activity">
              {td.tdeeActivityLabel}
            </label>
            <select
              id="tdee-activity"
              className='calculator-input'
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
            >
              {ACTIVITY_LEVELS.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='calculator-actions'>
          <button type="submit" className='button'>
            {td.tdeeCalculateButton}
          </button>
        </div>
      </form>

      {result && (
        <div className='calculator-result-card'>
          <h3>{td.tdeeResultTitle}</h3>
          <p>{td.tdeeMaintain}: {result.maintainWeight} kcal</p>
          <p>{td.tdeeLose}: {result.loseWeight} kcal</p>
          <p>{td.tdeeGain}: {result.gainWeight} kcal</p>
        </div>
      )}
    </div>
  );
}
