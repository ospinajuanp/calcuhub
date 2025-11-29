import React, { useState } from 'react';
import * as operator from './percentageTax.utils'
import * as operatorUtils from '@/features/calculators/utils'
import { useTranslation } from '@/core/i18n/useTranslation';

export default function PercentageVat () {
        const { tCalculators, tCommon } = useTranslation();
        const tax = tCalculators.tax

        const [resultCalculate, setResultCalculate] = useState<string | null>(null)
        const [taxPayment, setTaxPayment] = useState<number>(0)

        const [mount, setMount] = useState<string>('100')
        const [percentage, setPercentage] = useState<string>('20')

        const mountValue = operatorUtils.parseNumber(mount);
        const percentageValue = operatorUtils.parseNumber(percentage);

        if (!mountValue || percentageValue <= 0){
            setTaxPayment(0)
            setResultCalculate(tCommon.badInput);
            return;
        }

        const handleCalculate = (event : React.FormEvent) => {
            event.preventDefault();
            const result = operator.calculatePercentageTax(mountValue,percentageValue)
            setResultCalculate(result.toString())
            setTaxPayment(result+mountValue)

        }


    return (
        <>
            <h2>{tax.taxTitle}</h2>

            <form onSubmit={handleCalculate}>

                <div className='calculatoro-inputs'>
                    <div className='calculator-input-group'>
                        <label className='calculator-label'>
                            {tax.taxAmount}
                        </label>
                        <input 
                            type="number"
                            step="0.1"
                            min="0"
                            value={mount}
                            onChange={(e) => setMount(e.target.value)}
                            placeholder="100"
                            className='calculator-input'
                        />
                    </div>

                    <div className='calculator-input-group'>
                        <label className='calculator-label'>
                            {tax.taxPercentage}
                        </label>
                        <input 
                            type="number"
                            step="0.1"
                            min="0"
                            value={percentage}
                            onChange={(e) => setPercentage(e.target.value)}
                            placeholder="10"
                            className='calculator-input'
                        />
                    </div>

                </div>

                <div className='calculator-actions'>
                    <button type="submit" className='button'>
                        {tax.taxCalculateButton}
                    </button>
                </div>
            </form>

            {resultCalculate !== null && (
                <div className='calculator-result-card'>
                <h3>{tax.taxTitle}</h3>
                <p>
                    {
                    tax.taxResult
                        .replace('{{tax}}', resultCalculate)
                        .replace('{{payment}}', taxPayment.toString())
                    }
                </p>
                </div>
            )}
        </>
    )
}