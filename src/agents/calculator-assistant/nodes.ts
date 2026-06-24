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
    intent: 'non_math',
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

const buildResponseNode: GraphNode<typeof CalculatorAssistantState> = async state => {
  let finalAnswer

  if (state.intent === 'calculate') {
    finalAnswer = String(state.calculationResult)
  }

  if (state.intent === 'explain_concept') {
    finalAnswer = String(state.conceptExplanation)
  }

  if (state.intent === 'non_math') {
    finalAnswer = String(state.rejectionResponse)
  }

  return {
    finalAnswer,
  }
}

const rejectNonMathNode: GraphNode<typeof CalculatorAssistantState> = async state => {
  return {
    rejectionResponse: 'This is not a math question',
  }
}

const explainConceptNode: GraphNode<typeof CalculatorAssistantState> = async state => {
  const generateConceptResponse = 'this is the conecpt'

  return {
    conceptExplanation: generateConceptResponse,
  }
}

export {
  llmCallNode,
  classifyRequestNode,
  parseCalculationNode,
  executeCalculationNode,
  buildResponseNode,
  rejectNonMathNode,
  explainConceptNode,
}
