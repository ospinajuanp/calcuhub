'use client';
import { useState } from 'react';
import * as area from './area.utils';
import * as utils from '@/features/calculators/utils';
import { useTranslation } from '@/core/i18n/useTranslation';

const SHAPES = [
  { value: 'square', label: 'Square' },
  { value: 'rectangle', label: 'Rectangle' },
  { value: 'circle', label: 'Circle' },
  { value: 'triangle', label: 'Triangle' },
  { value: 'trapezoid', label: 'Trapezoid' },
  { value: 'parallelogram', label: 'Parallelogram' },
];

export default function AreaCalculator() {
  const { tCalculators } = useTranslation();
  const t = tCalculators.area;

  const [shape, setShape] = useState<string>('square');
  const [param1, setParam1] = useState<string>('');
  const [param2, setParam2] = useState<string>('');
  const [param3, setParam3] = useState<string>('');
  const [result, setResult] = useState<area.AreaResult | null>(null);

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    const p1 = utils.parseNumber(param1);
    const p2 = utils.parseNumber(param2);
    const p3 = utils.parseNumber(param3);

    const params: number[] = [p1];
    if (p2 !== null) params.push(p2);
    if (p3 !== null) params.push(p3);

    if (params.some(p => p === null || p <= 0)) {
      setResult(null);
      return;
    }

    setResult(area.calculateArea(shape as area.Shape, params));
  }

  function renderInputs() {
    const shapeType = shape as area.Shape;
    const paramLabels = area.getShapeParams(shapeType);

    return (
      <>
        {paramLabels.includes('side') && (
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="area-p1">{t.areaSideLabel}</label>
            <input id="area-p1" type="number" step="0.01" min="0" value={param1} onChange={(e) => setParam1(e.target.value)} className='calculator-input' />
          </div>
        )}
        {paramLabels.includes('width') && (
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="area-p1">{t.areaWidthLabel}</label>
            <input id="area-p1" type="number" step="0.01" min="0" value={param1} onChange={(e) => setParam1(e.target.value)} className='calculator-input' />
          </div>
        )}
        {paramLabels.includes('height') && (
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="area-p2">{t.areaHeightLabel}</label>
            <input id="area-p2" type="number" step="0.01" min="0" value={param2} onChange={(e) => setParam2(e.target.value)} className='calculator-input' />
          </div>
        )}
        {paramLabels.includes('radius') && (
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="area-p1">{t.areaRadiusLabel}</label>
            <input id="area-p1" type="number" step="0.01" min="0" value={param1} onChange={(e) => setParam1(e.target.value)} className='calculator-input' />
          </div>
        )}
        {paramLabels.includes('base') && (
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="area-p1">{t.areaBaseLabel}</label>
            <input id="area-p1" type="number" step="0.01" min="0" value={param1} onChange={(e) => setParam1(e.target.value)} className='calculator-input' />
          </div>
        )}
        {paramLabels.includes('base1') && (
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="area-p1">{t.areaBase1Label}</label>
            <input id="area-p1" type="number" step="0.01" min="0" value={param1} onChange={(e) => setParam1(e.target.value)} className='calculator-input' />
          </div>
        )}
        {paramLabels.includes('base2') && (
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="area-p2">{t.areaBase2Label}</label>
            <input id="area-p2" type="number" step="0.01" min="0" value={param2} onChange={(e) => setParam2(e.target.value)} className='calculator-input' />
          </div>
        )}
      </>
    );
  }

  return (
    <div>
      <form onSubmit={handleCalculate}>
        <div className='calculator-inputs'>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="area-shape">{t.areaShapeLabel}</label>
            <select id="area-shape" className='calculator-input' value={shape} onChange={(e) => { setShape(e.target.value); setParam1(''); setParam2(''); setParam3(''); }}>
              {SHAPES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
          {renderInputs()}
        </div>
        <div className='calculator-actions'>
          <button type="submit" className='button'>{t.areaCalculateButton}</button>
        </div>
      </form>
      {result && (
        <div className='calculator-result-card'>
          <h3>{t.areaResultTitle}</h3>
          <p>{t.areaValue}: {result.area}</p>
          {result.perimeter && <p>{t.areaPerimeter}: {result.perimeter}</p>}
        </div>
      )}
    </div>
  );
}
