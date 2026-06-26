import { describe, it, expect } from 'vitest'
import { END } from '@langchain/langgraph'
import { routeAfterClassification, routeAfterParse } from '../../src/agents/calculator-assistant/router'

describe('Calculator Assistant Router', () => {
  describe('routeAfterClassification', () => {
    it('should route to parse when intent is calculate', () => {
      const state = {
        intent: 'calculate' as const,
      }

      const result = routeAfterClassification(state)

      expect(result).toBe('parse')
    })

    it('should route to reject when intent is non_math', () => {
      const state = {
        intent: 'non_math' as const,
      }

      const result = routeAfterClassification(state)

      expect(result).toBe('reject')
    })

    it('should route to explain when intent is explain_concept', () => {
      const state = {
        intent: 'explain_concept' as const,
      }

      const result = routeAfterClassification(state)

      expect(result).toBe('explain')
    })

    it('should route to END for unknown intent', () => {
      const state = {
        intent: undefined,
      }

      const result = routeAfterClassification(state)

      expect(result).toBe(END)
    })
  })

  describe('routeAfterParse', () => {
    it('should route to finalResult when there is a lastError', () => {
      const state = {
        lastError: 'Missing operand in calculation',
      }

      const result = routeAfterParse(state)

      expect(result).toBe('finalResult')
    })

    it('should route to calculate when there is no lastError', () => {
      const state = {
        calculationRequest: {
          steps: [{ operation: 'add', operands: [3, 26] }],
        },
      }

      const result = routeAfterParse(state)

      expect(result).toBe('calculate')
    })

    it('should route to calculate when lastError is undefined', () => {
      const state = {
        lastError: undefined,
      }

      const result = routeAfterParse(state)

      expect(result).toBe('calculate')
    })

    it('should route to calculate when lastError is empty string', () => {
      const state = {
        lastError: '',
      }

      const result = routeAfterParse(state)

      // Empty string is falsy, so it should route to calculate
      expect(result).toBe('calculate')
    })

    it('should route to finalResult for division by zero error', () => {
      const state = {
        lastError: 'Divide by zero is not allowed',
      }

      const result = routeAfterParse(state)

      expect(result).toBe('finalResult')
    })
  })
})
