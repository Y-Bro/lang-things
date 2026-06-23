import { Annotation, MessagesAnnotation } from '@langchain/langgraph'
import { CalculationRequest, calculationStep, Intent } from './types.js'

const CalculatorAssistantState = Annotation.Root({
  ...MessagesAnnotation.spec,
  intent: Annotation<Intent>(),
  calculationRequest: Annotation<CalculationRequest>(),
})

export { CalculatorAssistantState }
