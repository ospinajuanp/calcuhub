import ImcCalculator from './health/imc/ImcCalculator';
import TmbCalculator from './health/tmb/TmbCalculator';
import WaterIntakeCalculator from './health/waterIntake/WaterIntake';
import compoundInterestCalculator from './finance/compoundInterest/CompoundInterest';
// cambiar ruta cuando se cree el componente
import loanPaymentsCalculator from './health/tmb/TmbCalculator';

export const calculatorRegistry = {
    imc: ImcCalculator,
    tmb: TmbCalculator,
    waterIntake: WaterIntakeCalculator,
    compoundInterest: compoundInterestCalculator,
    loanPayments: loanPaymentsCalculator,
};

