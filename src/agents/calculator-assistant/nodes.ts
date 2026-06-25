import { GraphNode } from '@langchain/langgraph'
import { CalculatorAssistantState } from './state.js'
import { haiku } from '../../models/anthropic.model.js'
import { CalculationRequest, Intent } from './types.js'
import { classifierGeminiModel, geminiV2Flash, parserGeminiModel } from '../../models/google.models.js'
import { SystemMessage } from '@langchain/core/messages'
import { classifierPrompt, ParserPrompt } from './prompt.js'

const classifyRequestNode: GraphNode<typeof CalculatorAssistantState> = async state => {
  const response = await classifierGeminiModel.invoke([new SystemMessage(classifierPrompt), state.messages.at(-1)!])

  return {
    intent: response.intent as Intent,
  }
}

const parseCalculationNode: GraphNode<typeof CalculatorAssistantState> = async state => {
  const response = await parserGeminiModel.invoke([new SystemMessage(ParserPrompt), state.messages.at(-1)!])

  if (response.ok) {
    return {
      calculationRequest: {
        steps: response.steps,
      },
    }
  }

  return {
    lastError: response.error,
  }
}

const executeCalculationNode: GraphNode<typeof CalculatorAssistantState> = async state => {
  return {
    calculationResult: 1.825,
    executionTrace: [{ node: 'Calculate', action: 'calculate the math' }],
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
    executionTrace: [{ node: 'FinalResponse', action: 'responsd' }],
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
  classifyRequestNode,
  parseCalculationNode,
  executeCalculationNode,
  buildResponseNode,
  rejectNonMathNode,
  explainConceptNode,
}
