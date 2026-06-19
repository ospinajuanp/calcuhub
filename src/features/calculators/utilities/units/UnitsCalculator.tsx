'use client';
import { useState } from 'react';
import * as operator from './units.utils';
import * as operatorUtils from '@/features/calculators/utils';
import { useTranslation } from '@/core/i18n/useTranslation';

type UnitCategory = 'length' | 'weight' | 'temperature';

const CATEGORIES: { value: UnitCategory; label: string }[] = [
  { value: 'length', label: 'Length' },
  { value: 'weight', label: 'Weight' },
  { value: 'temperature', label: 'Temperature' },
];

const UNITS: Record<UnitCategory, string[]> = {
  length: ['m', 'cm', 'mm', 'km', 'in', 'ft', 'yd', 'mi'],
  weight: ['kg', 'g', 'mg', 'lb', 'oz'],
  temperature: ['celsius', 'fahrenheit', 'kelvin'],
};

export default function UnitsCalculator() {
  const { tCalculators } = useTranslation();
  const un = tCalculators.units;

  const [category, setCategory] = useState<UnitCategory>('length');
  const [value, setValue] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('m');
  const [toUnit, setToUnit] = useState<string>('cm');
  const [result, setResult] = useState<number | null>(null);

  function handleCategoryChange(newCategory: UnitCategory) {
    setCategory(newCategory);
    setFromUnit(UNITS[newCategory][0]);
    setToUnit(UNITS[newCategory][1]);
    setResult(null);
  }

  function handleCalculate(event: React.FormEvent) {
    event.preventDefault();

    const valueNum = operatorUtils.parseNumber(value);

    if (!valueNum) {
      setResult(null);
      return;
    }

    const converted = operator.convertUnits(valueNum, fromUnit, toUnit, category);
    setResult(converted);
  }

  return (
    <div>
      <h2>{un.unitsTitle}</h2>

      <form onSubmit={handleCalculate}>
        <div className='calculator-inputs'>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="un-category">
              {un.unitsCategoryLabel}
            </label>
            <select
              id="un-category"
              className='calculator-input'
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value as UnitCategory)}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="un-value">
              {un.unitsValueLabel}
            </label>
            <input
              id="un-value"
              type="number"
              step="any"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className='calculator-input'
            />
          </div>

          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="un-from">
              {un.unitsFromLabel}
            </label>
            <select
              id="un-from"
              className='calculator-input'
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
            >
              {UNITS[category].map((unit) => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>

          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="un-to">
              {un.unitsToLabel}
            </label>
            <select
              id="un-to"
              className='calculator-input'
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
            >
              {UNITS[category].map((unit) => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
        </div>

        <div className='calculator-actions'>
          <button type="submit" className='button'>
            {un.unitsCalculateButton}
          </button>
        </div>
      </form>

      {result !== null && (
        <div className='calculator-result-card'>
          <h3>{un.unitsResultTitle}</h3>
          <p>{value} {fromUnit} = {result} {toUnit}</p>
        </div>
      )}
    </div>
  );
}
