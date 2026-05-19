'use client';
import { useState } from 'react';
import * as operador from './exactAge.utils'
import { useTranslation } from '@/core/i18n/useTranslation';

export default function ExactAgeCalculator() {
    const { tCalculators } = useTranslation();
    const ea = tCalculators.exactAge;

    const [birthDate, setBirthDate] = useState<string>('');
    const [result, setResult] = useState<operador.ExactAgeResult | null>(null);

    function handleCalculate(event: React.FormEvent) {
        event.preventDefault();

        if (!birthDate) {
            return;
        }

        const birth = new Date(birthDate);
        const today = new Date();

        if (isNaN(birth.getTime()) || birth > today) {
            return;
        }

        const ageResult = operador.calculateExactAge(birth, today);
        setResult(ageResult);
    }

    return (
        <div>
            <h2>{ea.name}</h2>

            <form onSubmit={handleCalculate}>
                <div className='calculator-inputs'>
                    <div className='calculator-input-group'>
                        <label className='calculator-label'>
                            {ea.exactAgeBirthDateLabel}
                        </label>
                        <input
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className='calculator-input'
                            max={new Date().toISOString().split('T')[0]}
                        />
                    </div>
                </div>

                <div className='calculator-actions'>
                    <button type="submit" className='button'>
                        {ea.exactAgeCalculateButton}
                    </button>
                </div>
            </form>

            {result && (
                <div className='calculator-result-card'>
                    <h3>{ea.exactAgeResultTitle}</h3>
                    <p>{ea.exactAgeYourAgeIs}</p>
                    <p>{result.years} {ea.exactAgeYears}, {result.months} {ea.exactAgeMonths}, {result.days} {ea.exactAgeDays}</p>
                </div>
            )}
        </div>
    );
}