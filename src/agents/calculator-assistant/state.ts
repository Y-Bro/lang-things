import { Annotation, MessagesAnnotation } from '@langchain/langgraph'
import {
  CalculationRequest,
  CalculationResult,
  calculationStep,
  ConceptExplanation,
  ExecutionTraceEvent,
  Intent,
  RejectionResponse,
} from './types.js'

const CalculatorAssistantState = Annotation.Root({
  ...MessagesAnnotation.spec,
  intent: Annotation<Intent>(),
  calculationRequest: Annotation<CalculationRequest>(),
  calculationResult: Annotation<CalculationResult>(),
  conceptExplanation: Annotation<ConceptExplanation>(),
  rejectionResponse: Annotation<RejectionResponse>(),
  executionTrace: Annotation<ExecutionTraceEvent[]>({
    reducer: (current, update) => current.concat(update),
    default: () => [],
  }),
  finalAnswer: Annotation<string | unknown>(),
  lastError: Annotation<string | undefined>(),
})

export { CalculatorAssistantState }
