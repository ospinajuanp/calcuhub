// src/core/i18n/dictionaries/es.ts
export const esDictionary = {
  common: {
    siteName: 'CalcuHub',
    tagline: 'Calculadoras prácticas para tu día a día',
    categoriesTitle: 'Categorías',
    calculatorsTitle: 'Calculadoras destacadas',
    madeIn: 'Hecho con ❤️ por ',
    theme:{
      light: 'Claro',
      dark: 'Oscuro',
      retro: 'Retro',
      cardboard: 'Cartón',
      cartoon: 'Cartoon',
    }
  },
  categories: {
    health: {
      name: 'Salud',
      description: 'Calculadoras para cuidar tu cuerpo y bienestar.',
    },
    finance: {
      name: 'Finanzas',
      description: 'Herramientas para entender mejor tu dinero.',
    },
  },
  calculators: {
    imc: {
      name: 'Índice de Masa Corporal (IMC)',
      shortDescription: 'Calcula tu IMC y conoce tu rango de peso.',
      bmiTitle: 'Calcula tu Índice de Masa Corporal (IMC)',
      bmiWeightLabel: 'Peso',
      bmiHeightLabel: 'Altura',
      bmiCalculateButton: 'Calcular IMC',
      bmiResultTitle: 'Resultado del IMC',
      bmiYourBmiIs: 'Tu IMC es {{bmi}}, lo que te ubica en la categoría:',  
      categories: {
        underweight: 'Bajo peso. Consulta con un profesional de salud si tienes dudas sobre tu alimentación.',
        normal: 'Rango normal. Mantén hábitos saludables de alimentación y actividad física.',
        overweight: 'Sobrepeso. Podría ser recomendable revisar tu alimentación y nivel de actividad física.',
        obesity: 'Obesidad. Es recomendable consultar con un profesional de salud para una evaluación más completa.',
       },
    },
    tmb: {
      name: 'Tasa Metabólica Basal (TMB)',
      shortDescription: 'Estimación de calorías que tu cuerpo usa en reposo.',
    },
    waterIntake: {
      name: 'Consumo diario de agua',
      shortDescription: 'Cantidad de agua recomendada según tu peso.',
    },
    compoundInterest: {
      name: 'Interés compuesto',
      shortDescription: 'Simula el crecimiento de tu inversión a largo plazo.',
    },
    loanPayments: {
      name: 'Cuotas de préstamo',
      shortDescription: 'Calcula el valor de la cuota mensual de tu crédito.',
    },
  },
};
