import ImcCalculator from './health/imc/ImcCalculator';
import TmbCalculator from './health/tmb/TmbCalculator';
// cambiar ruta cuando se cree el componente
import WaterIntakeCalculator from './health/tmb/TmbCalculator';
import compoundInterestCalculator from './health/tmb/TmbCalculator';
import loanPaymentsCalculator from './health/tmb/TmbCalculator';

export const calculatorRegistry = {
    imc: ImcCalculator,
    tmb: TmbCalculator,
    waterIntake: WaterIntakeCalculator,
    compoundInterest: compoundInterestCalculator,
    loanPayments: loanPaymentsCalculator,
};

