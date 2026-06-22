import { ConditionalEdgeRouter, END } from '@langchain/langgraph'
import { CalculatorState } from './calculator.state.js'
import { AIMessage } from '@langchain/core/messages'

export const shouldContinue: ConditionalEdgeRouter<
  typeof CalculatorState,
  Record<string, unknown>,
  'toolNode'
> = state => {
  const lastMessage = state.messages.at(-1)

  if (!lastMessage || !AIMessage.isInstance(lastMessage)) {
    return END
  }

  if (lastMessage.tool_calls?.length) {
    return 'toolNode'
  }

  return END
}
