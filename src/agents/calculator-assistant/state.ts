import { Annotation, MessagesAnnotation } from '@langchain/langgraph'
import {
  CalculationRequest,
  CalculationResult,
  calculationStep,
  ConceptExplanation,
  Intent,
  RejectionResponse,
} from './types.js'

const CalculatorAssistantState = Annotation.Root({
  ...MessagesAnnotation.spec,
  intent: Annotation<Intent>(),
  calculationRequest: Annotation<CalculationRequest>(),
  calculationResult: Annotation<CalculationResult>,
  conceptExplanation: Annotation<ConceptExplanation>(),
  rejectionResponse: Annotation<RejectionResponse>,
  finalAnswer: Annotation<string | unknown>(),
})

export { CalculatorAssistantState }
