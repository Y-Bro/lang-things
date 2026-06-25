import { GraphNode } from '@langchain/langgraph'
import { CalculatorAssistantState } from './state.js'
import { haiku } from '../../models/anthropic.model.js'
import { CalculationRequest, Intent } from './types.js'
import { classifierGeminiModel, geminiV2Flash, parserGeminiModel } from '../../models/google.models.js'
import { SystemMessage } from '@langchain/core/messages'
import { classifierPrompt, ParserPrompt } from './prompt.js'
import { calculate } from '../../util/calculate.js'

const classifyRequestNode: GraphNode<typeof CalculatorAssistantState> = async state => {
  const response = await classifierGeminiModel.invoke([new SystemMessage(classifierPrompt), state.messages.at(-1)!])

  return {
    intent: response.intent as Intent,
  }
}

const parseCalculationNode: GraphNode<typeof CalculatorAssistantState> = async state => {
  const response = await parserGeminiModel.invoke([new SystemMessage(ParserPrompt), state.messages.at(-1)!])

  if (response.status === 'success' && response.steps) {
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
  const calculationRequest = state.calculationRequest

  if (!calculationRequest.steps) {
    return {
      lastError: 'No calulcation request found',
    }
  }

  const calculationResult = calculate(calculationRequest)!

  if (!calculationResult.ok) {
    return {
      lastError: calculationResult.error,
    }
  }

  return {
    calculationResult: calculationResult.result!,
  }
}

const buildResponseNode: GraphNode<typeof CalculatorAssistantState> = async state => {
  let finalAnswer

  if (state.lastError) {
    finalAnswer = String(state.lastError)
    return {
      finalAnswer,
    }
  }

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
  classifyRequestNode,
  parseCalculationNode,
  executeCalculationNode,
  buildResponseNode,
  rejectNonMathNode,
  explainConceptNode,
}
