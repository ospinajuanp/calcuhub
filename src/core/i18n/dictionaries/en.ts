// src/core/i18n/dictionaries/en.ts
export const enDictionary = {
  common: {
    siteName: 'CalcuHub',
    tagline: 'Practical calculators for everyday decisions',
    categoriesTitle: 'Categories',
    categoriesDescription: 'Explore our calculators by popular categories.',
    calculatorsTitle: 'Featured calculators',
    calculatorsDescription: 'Quick access to our most used calculators.',
    madeIn: 'Made with ❤️ by ',
    theme:{
      light: 'Light',
      dark: 'Dark',
      retro: 'Retro',
      cardboard: 'Cardboard',
      cartoon: 'Cartoon',
    }
  },
  categories: {
    health: {
      name: 'Health',
      description: 'Calculators to support your body and wellbeing.',
    },
    finance: {
      name: 'Finance',
      description: 'Tools to better understand your money.',
    },
  },
  calculators: {
    imc: {
      name: 'Body Mass Index (BMI)',
      shortDescription: 'Calculate your BMI and weight range.',
      bmiTitle: 'Calculate your Body Mass Index (BMI)',
      bmiWeightLabel: 'Weight',
      bmiHeightLabel: 'Height',
      bmiCalculateButton: 'Calculate BMI',
      bmiResultTitle: 'BMI Result',
      bmiYourBmiIs: 'Your BMI is {{bmi}}, which places you in the category:',    
      categories: {
        underweight: 'Underweight. Consult a health professional if you have concerns about your diet.',
        normal: 'Normal range. Maintain healthy eating and physical activity habits.',
        overweight: 'Overweight. It may be advisable to review your diet and physical activity level.',
        obesity: 'Obesity. It is recommended to consult a health professional for a more comprehensive evaluation.',
       },
    },
    tmb: {
      name: 'Basal Metabolic Rate (BMR)',
      shortDescription: 'Estimate calories your body uses at rest.',
      tmbTitle: 'Calculate your Basal Metabolic Rate (BMR)',
      tmbWeightLabel: 'Weight',
      tmbHeightLabel: 'Height',
      tmbAgeLabel: 'Age',
      tmbGenderLabel: 'Gender',
      tmbMaleOption: 'Male',
      tmbFemaleOption: 'Female',
      tmbCalculateButton: 'Calculate BMR',
      tmbResultTitle: 'BMR Result',
      tmbYourTmbIs: 'Your BMR is {{tmb}}.',
    },
    waterIntake: {
      name: 'Daily water intake',
      shortDescription: 'Recommended water amount based on your weight.',
    },
    compoundInterest: {
      name: 'Compound interest',
      shortDescription: 'Simulate long-term growth of your investment.',
    },
    loanPayments: {
      name: 'Loan payments',
      shortDescription: 'Calculate the monthly payment for your loan.',
    },
  },
};
