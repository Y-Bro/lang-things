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
      steps: [
        { operation: 'add', operands: [3, 26] },
        {
          operation: 'divide',
          operands: ['previous', 16],
        },
      ],
    },
  }
}

const executeCalculationNode: GraphNode<typeof CalculatorAssistantState> = async state => {
  return {
    calculationResult: 1.825,
  }
}

export { llmCallNode, classifyRequestNode, parseCalculationNode, executeCalculationNode }
