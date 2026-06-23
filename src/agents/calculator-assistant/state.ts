import { Annotation, MessagesAnnotation } from '@langchain/langgraph'
import { CalculationRequest, CalculationResult, calculationStep, Intent } from './types.js'

const CalculatorAssistantState = Annotation.Root({
  ...MessagesAnnotation.spec,
  intent: Annotation<Intent>(),
  calculationRequest: Annotation<CalculationRequest>(),
  calculationResult: Annotation<CalculationResult>,
})

export { CalculatorAssistantState }
