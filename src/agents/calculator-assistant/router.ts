import { ConditionalEdgeRouter, END } from '@langchain/langgraph'
import { CalculatorAssistantState } from './state.js'

const routeAfterClassification: ConditionalEdgeRouter<
  typeof CalculatorAssistantState,
  Record<string, unknown>,
  'parse'
> = state => {
  if (state.intent === 'calculate') {
    return 'parse'
  }

  return END
}

export { routeAfterClassification }
