import { SystemMessage } from '@langchain/core/messages'
import { GraphNode } from '@langchain/langgraph'
import { CalculatorState } from './calculator.state.js'
import { haikuWithTools } from '../../models/anthropic.model.js'
import { calculatorSystemPrompt } from './calculator.prompt.js'

const llmCall: GraphNode<typeof CalculatorState> = async state => {
  const response = await haikuWithTools.invoke([new SystemMessage(calculatorSystemPrompt), ...state.messages])

  return {
    messages: [response],
    llmCalls: 1,
  }
}
