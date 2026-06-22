import { StateGraph, StateSchema, MessagesValue, ReducedValue } from '@langchain/langgraph'
import z from 'zod'

const CalculatorState = new StateSchema({
  messages: MessagesValue,
  llmCalls: new ReducedValue(z.number().default(0), { reducer: (x, y) => x + y }),
})

export { CalculatorState }
