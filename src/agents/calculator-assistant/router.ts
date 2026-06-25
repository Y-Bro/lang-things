import { ConditionalEdgeRouter, END } from '@langchain/langgraph'
import { CalculatorAssistantState } from './state.js'

const routeAfterClassification: ConditionalEdgeRouter<
  typeof CalculatorAssistantState,
  Record<string, unknown>,
  'parse' | 'reject' | 'explain'
> = state => {
  if (state.intent === 'calculate') {
    return 'parse'
  }

  if (state.intent === 'non_math') {
    return 'reject'
  }

  if (state.intent === 'explain_concept') {
    return 'explain'
  }

  return END
}

const routeAfterParse: ConditionalEdgeRouter<typeof CalculatorAssistantState> = state => {
  if (state.lastError) return 'finalResult'
  return 'calculate'
}

export { routeAfterClassification, routeAfterParse }
