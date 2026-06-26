import { describe, it, expect } from 'vitest'
import { routeAfterClassification, routeAfterParse } from '../../src/agents/calculator-assistant/router'
import {
  executeCalculationNode,
  buildResponseNode,
  rejectNonMathNode,
  explainConceptNode,
} from '../../src/agents/calculator-assistant/nodes'

describe('Calculator Assistant Integration Tests', () => {
  describe('Happy Path: Math Calculation', () => {
    it('should route calculate intent -> parse -> execute -> respond', async () => {
      // Step 1: Classification routing
      const classifyState = { intent: 'calculate' as const }
      const classifyRoute = routeAfterClassification(classifyState)
      expect(classifyRoute).toBe('parse')

      // Step 2: Parse routing (simulated - no error)
      const parseState = { calculationRequest: { steps: [{ operation: 'add', operands: [3, 26] }] } }
      const parseRoute = routeAfterParse(parseState)
      expect(parseRoute).toBe('calculate')

      // Step 3: Execute calculation
      const executeState = {
        calculationRequest: {
          steps: [
            { operation: 'add', operands: [3, 26] },
            { operation: 'divide', operands: ['previous' as any, 16] },
          ],
        },
      }
      const executeResult = await executeCalculationNode(executeState)
      expect(executeResult.calculationResult).toBe(1.8125)

      // Step 4: Build response
      const responseState = {
        intent: 'calculate' as const,
        calculationResult: 1.8125,
      }
      const responseResult = await buildResponseNode(responseState)
      expect(responseResult.finalAnswer).toBe('1.8125')
    })
  })

  describe('Error Path: Division by Zero', () => {
    it('should handle division by zero and return error response', async () => {
      // Step 1: Classification
      const classifyRoute = routeAfterClassification({ intent: 'calculate' as const })
      expect(classifyRoute).toBe('parse')

      // Step 2: Execute with division by zero
      const executeState = {
        calculationRequest: {
          steps: [{ operation: 'divide', operands: [10, 0] }],
        },
      }
      const executeResult = await executeCalculationNode(executeState)
      expect(executeResult.lastError).toBe('Divide by zero is not allowed')

      // Step 3: Route to finalResult due to error
      const parseState = { lastError: executeResult.lastError }
      const parseRoute = routeAfterParse(parseState)
      expect(parseRoute).toBe('finalResult')

      // Step 4: Build error response
      const responseState = {
        intent: 'calculate' as const,
        lastError: executeResult.lastError,
      }
      const responseResult = await buildResponseNode(responseState)
      expect(responseResult.finalAnswer).toBe('Divide by zero is not allowed')
    })
  })

  describe('Non-Math Path', () => {
    it('should classify as non_math and reject', async () => {
      // Step 1: Classification routes to reject
      const classifyRoute = routeAfterClassification({ intent: 'non_math' as const })
      expect(classifyRoute).toBe('reject')

      // Step 2: Reject node generates response
      const rejectResult = await rejectNonMathNode({})
      expect(rejectResult.rejectionResponse).toBe('This is not a math question')

      // Step 3: Build response
      const responseState = {
        intent: 'non_math' as const,
        rejectionResponse: rejectResult.rejectionResponse,
      }
      const responseResult = await buildResponseNode(responseState)
      expect(responseResult.finalAnswer).toBe('This is not a math question')
    })
  })

  describe('Concept Explanation Path', () => {
    it('should classify as explain_concept and provide explanation', async () => {
      // Step 1: Classification routes to explain
      const classifyRoute = routeAfterClassification({ intent: 'explain_concept' as const })
      expect(classifyRoute).toBe('explain')

      // Step 2: Explain node generates response
      const explainResult = await explainConceptNode({})
      expect(explainResult.conceptExplanation).toBe('this is the conecpt')

      // Step 3: Build response
      const responseState = {
        intent: 'explain_concept' as const,
        conceptExplanation: explainResult.conceptExplanation,
      }
      const responseResult = await buildResponseNode(responseState)
      expect(responseResult.finalAnswer).toBe('this is the conecpt')
    })
  })

  describe('Complex Calculations', () => {
    it('should handle (5 * 4 + 10) / 2 = 15', async () => {
      const state = {
        calculationRequest: {
          steps: [
            { operation: 'multiply', operands: [5, 4] },
            { operation: 'add', operands: ['previous' as any, 10] },
            { operation: 'divide', operands: ['previous' as any, 2] },
          ],
        },
      }

      const result = await executeCalculationNode(state)
      expect(result.calculationResult).toBe(15)
    })

    it('should handle 100 - 25 * 2 = 50', async () => {
      const state = {
        calculationRequest: {
          steps: [
            { operation: 'subtract', operands: [100, 25] },
            { operation: 'multiply', operands: ['previous' as any, 2] },
          ],
        },
      }

      const result = await executeCalculationNode(state)
      expect(result.calculationResult).toBe(150)
    })
  })
})
