import { describe, it, expect, vi } from 'vitest'
import {
  executeCalculationNode,
  buildResponseNode,
  rejectNonMathNode,
  explainConceptNode,
} from '../../src/agents/calculator-assistant/nodes'

// Tests for nodes that don't depend on external API calls

describe('Calculator Assistant Nodes', () => {
  describe('executeCalculationNode', () => {
    it('should execute a simple addition', async () => {
      const state = {
        calculationRequest: {
          steps: [{ operation: 'add', operands: [3, 26] }],
        },
      }

      const result = await executeCalculationNode(state)

      expect(result.calculationResult).toBe(29)
    })

    it('should execute multi-step calculations', async () => {
      const state = {
        calculationRequest: {
          steps: [
            { operation: 'add', operands: [3, 26] },
            { operation: 'divide', operands: ['previous' as any, 16] },
          ],
        },
      }

      const result = await executeCalculationNode(state)

      expect(result.calculationResult).toBe(1.8125)
    })

    it('should return error for division by zero', async () => {
      const state = {
        calculationRequest: {
          steps: [{ operation: 'divide', operands: [10, 0] }],
        },
      }

      const result = await executeCalculationNode(state)

      expect(result.lastError).toBe('Divide by zero is not allowed')
      expect(result.calculationResult).toBeUndefined()
    })

    it('should return error when no calculation request', async () => {
      const state = {
        calculationRequest: {
          steps: undefined,
        },
      }

      const result = await executeCalculationNode(state)

      expect(result.lastError).toBeDefined()
    })

    it('should handle multiplication', async () => {
      const state = {
        calculationRequest: {
          steps: [{ operation: 'multiply', operands: [7, 8] }],
        },
      }

      const result = await executeCalculationNode(state)

      expect(result.calculationResult).toBe(56)
    })

    it('should handle subtraction', async () => {
      const state = {
        calculationRequest: {
          steps: [{ operation: 'subtract', operands: [50, 25] }],
        },
      }

      const result = await executeCalculationNode(state)

      expect(result.calculationResult).toBe(25)
    })
  })

  describe('buildResponseNode', () => {
    it('should build response for calculation result', async () => {
      const state = {
        intent: 'calculate' as const,
        calculationResult: 29,
      }

      const result = await buildResponseNode(state)

      expect(result.finalAnswer).toBe('29')
    })

    it('should build response for concept explanation', async () => {
      const state = {
        intent: 'explain_concept' as const,
        conceptExplanation: 'An imaginary number is a complex number...',
      }

      const result = await buildResponseNode(state)

      expect(result.finalAnswer).toBe('An imaginary number is a complex number...')
    })

    it('should build response for non-math rejection', async () => {
      const state = {
        intent: 'non_math' as const,
        rejectionResponse: 'This is not a math question',
      }

      const result = await buildResponseNode(state)

      expect(result.finalAnswer).toBe('This is not a math question')
    })

    it('should return error message when lastError is set', async () => {
      const state = {
        intent: 'calculate' as const,
        lastError: 'Divide by zero is not allowed',
      }

      const result = await buildResponseNode(state)

      expect(result.finalAnswer).toBe('Divide by zero is not allowed')
    })

    it('should prioritize lastError over other fields', async () => {
      const state = {
        intent: 'calculate' as const,
        calculationResult: 42,
        lastError: 'Some error occurred',
      }

      const result = await buildResponseNode(state)

      expect(result.finalAnswer).toBe('Some error occurred')
    })
  })

  describe('rejectNonMathNode', () => {
    it('should return rejection response for non-math requests', async () => {
      const state = {}

      const result = await rejectNonMathNode(state)

      expect(result.rejectionResponse).toBe('This is not a math question')
    })
  })

  describe('explainConceptNode', () => {
    it('should return concept explanation', async () => {
      const state = {}

      const result = await explainConceptNode(state)

      expect(result.conceptExplanation).toBe('this is the conecpt')
    })
  })
})
