import { GraphNode } from '@langchain/langgraph'
import { CalculatorAssistantState } from './state.js'
import { haiku } from '../../models/anthropic.model.js'
import { CalculationRequest } from './types.js'

const llmCallNode: GraphNode<typeof CalculatorAssistantState> = async state => {
  const response = await haiku.invoke([...state.messages])

  return {
    messages: [response],
  }
}

const classifyRequestNode: GraphNode<typeof CalculatorAssistantState> = async state => {
  return {
    intent: 'calculate',
  }
}

const parseCalculationNode: GraphNode<typeof CalculatorAssistantState> = async state => {
  return {
    calculationRequest: {
      steps: [{}],
    },
  }
}

export { llmCallNode, classifyRequestNode, parseCalculationNode }
