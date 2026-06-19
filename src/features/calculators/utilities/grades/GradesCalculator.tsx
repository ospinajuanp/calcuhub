'use client';
import { useState } from 'react';
import * as operator from './grades.utils';
import * as operatorUtils from '@/features/calculators/utils';
import { useTranslation } from '@/core/i18n/useTranslation';

export default function GradesCalculator() {
  const { tCalculators } = useTranslation();
  const gr = tCalculators.grades;

  const [gradesInput, setGradesInput] = useState<string>('80,85,90,75');
  const [passingGrade, setPassingGrade] = useState<string>('60');
  const [result, setResult] = useState<operator.GradeResult | null>(null);

  function handleCalculate(event: React.FormEvent) {
    event.preventDefault();

    const gradesArray = gradesInput
      .split(',')
      .map(g => operatorUtils.parseNumber(g.trim()))
      .filter(g => g !== null && !isNaN(g));

    if (gradesArray.length === 0) {
      setResult(null);
      return;
    }

    const average = operator.calculateAverage(gradesArray);
    const letterGrade = operator.getLetterGrade(average);
    const passingGradeNum = operatorUtils.parseNumber(passingGrade) || 60;
    const status = operator.getGradeStatus(average, passingGradeNum);

    setResult({ average, letterGrade, status });
  }

  return (
    <div>
      <h2>{gr.gradesTitle}</h2>

      <form onSubmit={handleCalculate}>
        <div className='calculator-inputs'>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="gr-grades">
              {gr.gradesInputLabel}
            </label>
            <input
              id="gr-grades"
              type="text"
              value={gradesInput}
              onChange={(e) => setGradesInput(e.target.value)}
              placeholder="80,85,90,75"
              className='calculator-input'
            />
          </div>

          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="gr-passing">
              {gr.gradesPassingLabel}
            </label>
            <input
              id="gr-passing"
              type="number"
              step="1"
              min="0"
              max="100"
              value={passingGrade}
              onChange={(e) => setPassingGrade(e.target.value)}
              className='calculator-input'
            />
          </div>
        </div>

        <div className='calculator-actions'>
          <button type="submit" className='button'>
            {gr.gradesCalculateButton}
          </button>
        </div>
      </form>

      {result && (
        <div className='calculator-result-card'>
          <h3>{gr.gradesResultTitle}</h3>
          <p>{gr.gradesAverage}: {result.average}</p>
          <p>{gr.gradesLetter}: {result.letterGrade}</p>
          <p>{gr.gradesStatus}: {result.status}</p>
        </div>
      )}
    </div>
  );
}
