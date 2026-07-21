'use client';
import { useState } from 'react';
import * as bf from './bodyFat.utils';
import * as utils from '@/features/calculators/utils';
import { useTranslation } from '@/core/i18n/useTranslation';

export default function BodyFatCalculator() {
  const { tCalculators } = useTranslation();
  const t = tCalculators.bodyFat;

  const [gender, setGender] = useState<string>('male');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [waist, setWaist] = useState<string>('');
  const [neck, setNeck] = useState<string>('');
  const [hip, setHip] = useState<string>('');
  const [result, setResult] = useState<bf.BodyFatResult | null>(null);

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    const w = utils.parseNumber(weight);
    const h = utils.parseNumber(height);
    const a = parseInt(age);
    const wa = utils.parseNumber(waist);
    const n = utils.parseNumber(neck);
    const hi = gender === 'female' ? utils.parseNumber(hip) : 0;

    if (!w || !h || !a || !wa || !n || (gender === 'female' && !hi)) {
      setResult(null);
      return;
    }

    setResult(bf.calculateBodyFat(gender as 'male' | 'female', w, h, a, wa, n, hi || undefined));
  }

  return (
    <div>
      <form onSubmit={handleCalculate}>
        <div className='calculator-inputs'>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="bf-gender">{t.bodyFatGenderLabel}</label>
            <select id="bf-gender" className='calculator-input' value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="male">{t.bodyFatMaleOption}</option>
              <option value="female">{t.bodyFatFemaleOption}</option>
            </select>
          </div>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="bf-weight">{t.bodyFatWeightLabel}</label>
            <input id="bf-weight" type="number" step="0.1" min="0" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="70" className='calculator-input' />
          </div>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="bf-height">{t.bodyFatHeightLabel}</label>
            <input id="bf-height" type="number" step="0.1" min="0" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="170" className='calculator-input' />
          </div>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="bf-age">{t.bodyFatAgeLabel}</label>
            <input id="bf-age" type="number" step="1" min="0" value={age} onChange={(e) => setAge(e.target.value)} placeholder="30" className='calculator-input' />
          </div>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="bf-waist">{t.bodyFatWaistLabel}</label>
            <input id="bf-waist" type="number" step="0.1" min="0" value={waist} onChange={(e) => setWaist(e.target.value)} placeholder="80" className='calculator-input' />
          </div>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="bf-neck">{t.bodyFatNeckLabel}</label>
            <input id="bf-neck" type="number" step="0.1" min="0" value={neck} onChange={(e) => setNeck(e.target.value)} placeholder="38" className='calculator-input' />
          </div>
          {gender === 'female' && (
            <div className='calculator-input-group'>
              <label className='calculator-label' htmlFor="bf-hip">{t.bodyFatHipLabel}</label>
              <input id="bf-hip" type="number" step="0.1" min="0" value={hip} onChange={(e) => setHip(e.target.value)} placeholder="95" className='calculator-input' />
            </div>
          )}
        </div>
        <div className='calculator-actions'>
          <button type="submit" className='button'>{t.bodyFatCalculateButton}</button>
        </div>
      </form>
      {result && (
        <div className='calculator-result-card'>
          <h3>{t.bodyFatResultTitle}</h3>
          <p>{t.bodyFatPercentage}: {result.bodyFatPercentage}%</p>
          <p>{t.bodyFatCategory}: {t[`bodyFat${result.category.charAt(0).toUpperCase() + result.category.slice(1)}` as keyof typeof t]}</p>
          <p>{t.bodyFatFatMass}: {result.fatMass} kg</p>
          <p>{t.bodyFatLeanMass}: {result.leanMass} kg</p>
        </div>
      )}
    </div>
  );
}
