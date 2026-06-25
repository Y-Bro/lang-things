export type Intent = 'calculate' | 'non_math' | 'explain_concept'

export type calculationStep = {
  operation: 'add' | 'subtract' | 'multiply' | 'divide'
  operands: (number | 'previous')[]
}

export type CalculationRequest = {
  steps: calculationStep[]
}

export type CalculationResult = number

export type RejectionResponse = string

export type ConceptExplanation = string

export type ExecutionTraceEvent = {
  node: string
  action: string
}
