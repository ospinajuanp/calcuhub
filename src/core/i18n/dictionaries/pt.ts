// src/core/i18n/dictionaries/es.ts
export const ptDictionary = {
  common: {
    siteName: 'CalcuHub',
    tagline: 'Calculadoras práticas para o seu dia a dia',
    categoriesTitle: 'Categorias',
    categoriesDescription: 'Explore nossas calculadoras por categorias populares.',
    calculatorsTitle: 'Calculadoras em destaque',
    calculatorsDescription: 'Acesso rápido às nossas calculadoras mais usadas.',
    madeIn: 'Feito com ❤️ por ',
    theme:{
      light: 'Claro',
      dark: 'Escuro',
      retro: 'Retrô',
      cardboard: 'Papelão',
      cartoon: 'Cartoon',
    }
  },
  categories: {
    health: {
      name: 'Saúde',
      description: 'Ferramentas para monitorar e melhorar seu bem-estar.',
    },
    finance: {
      name: 'Finanças',
      description: 'Calculadoras para gerenciar seu dinheiro e investimentos.',
    },
  },
  calculators: {
    imc: {
      name: 'Índice de Massa Corporal (IMC)',
      shortDescription: 'Calcule seu IMC com base no peso e altura.',
      bmiTitle: 'Calculadora de IMC',
      bmiWeightLabel: 'Peso',
      bmiHeightLabel: 'Altura',
      bmiCalculateButton: 'Calcular IMC',
      bmiResultTitle: 'Resultado do IMC',
      bmiYourBmiIs: 'Seu IMC é {{bmi}}, o que indica:',  
      categories: {
        underweight: 'Abaixo do peso. Considere consultar um profissional de saúde para orientação.',
        normal: 'Peso normal. Mantenha seus hábitos saudáveis!',
        overweight: 'Sobrepeso. Considere adotar um estilo de vida mais ativo e uma dieta equilibrada.',
        obesity: 'Obesidade. É recomendável procurar orientação médica para melhorar sua saúde.',
       },
    },
    tmb: {
      name: 'Taxa Metabólica Basal (TMB)',
      shortDescription: 'Calcule suas necessidades calóricas diárias.',
    },
    waterIntake: {
      name: 'Consumo diário de água',
      shortDescription: 'Calcule a quantidade ideal de água que você deve beber diariamente.',
    },
    compoundInterest: {
      name: 'Juros Compostos',
      shortDescription: 'Calcule o valor acumulado de um investimento com juros compostos.',
    },
    loanPayments: {
      name: 'Pagamentos de empréstimos',
      shortDescription: 'Calcule o valor da prestação mensal do seu crédito.',
    },
  },
};
