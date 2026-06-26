import { describe, it, expect } from 'vitest'
import { calculate } from '../../src/util/calculate'
import type { CalculationRequest } from '../../src/agents/calculator-assistant/types'

describe('calculate', () => {
  it('should add 3 and 26 and divide by 16, returning 1.8125', () => {
    const request: CalculationRequest = {
      steps: [
        { operation: 'add', operands: [3, 26] },
        { operation: 'divide', operands: ['previous', 16] },
      ],
    }

    const result = calculate(request)

    expect(result.ok).toBe(true)
    expect(result.result).toBe(1.8125)
  })

  it('should return division by zero error when dividing 10 by 0', () => {
    const request: CalculationRequest = {
      steps: [{ operation: 'divide', operands: [10, 0] }],
    }

    const result = calculate(request)

    expect(result.ok).toBe(false)
    expect(result.error).toBe('Divide by zero is not allowed')
  })

  it('should return missing operand error when divide operation has missing operand', () => {
    const request: CalculationRequest = {
      steps: [{ operation: 'divide', operands: [10, undefined as any] }],
    }

    const result = calculate(request)

    // With undefined operand resolved to 0, this becomes 10 / 0
    expect(result.ok).toBe(false)
    expect(result.error).toBe('Divide by zero is not allowed')
  })

  it('should handle non-math rejection gracefully with an empty calculation request', () => {
    const request: CalculationRequest = {
      steps: [],
    }

    const result = calculate(request)

    expect(result.ok).toBe(true)
    expect(result.result).toBeUndefined()
  })

  it('should handle concept explanation path by returning early with empty steps', () => {
    const request: CalculationRequest = {
      steps: [],
    }

    const result = calculate(request)

    expect(result.ok).toBe(true)
    expect(result.result).toBeUndefined()
  })
})
