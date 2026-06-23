export type Intent = 'calculate'

export type calculationStep = {
  operation: 'add' | 'subtract' | 'multiply' | 'divide'
  operands: (number | 'previous')[]
}

export type CalculationRequest = {
  steps: calculationStep[]
}
