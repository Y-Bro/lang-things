import type { CalculationRequest } from '../agents/calculator-assistant/types.js'

export const calculate = (calculationRequest: CalculationRequest) => {
  const { steps } = calculationRequest

  let previous: number | undefined

  for (const step of steps) {
    const { operands, operation } = step

    const resolve = (operand: number | 'previous' | undefined) =>
      operand === 'previous' ? (previous ?? 0) : (operand ?? 0)
    const left = resolve(operands[0])
    const right = resolve(operands[1])

    switch (operation) {
      case 'add':
        if (!previous) {
          previous = left + right
          break
        }
        previous = previous + right
        break
      case 'multiply':
        if (!previous) {
          previous = left * right
          break
        }
        previous = previous * right
        break
      case 'divide':
        if (right == 0) {
          console.log('are we here ?', left, right)
          return {
            ok: false,
            error: 'Divide by zero is not allowed',
          }
        }

        if (!previous) {
          previous = left / right
          break
        }
        previous = previous / right
        break
      case 'subtract':
        if (!previous) {
          previous = left - right
          break
        }
        previous = previous - right
        break
    }
  }

  return {
    ok: true,
    result: previous,
  }
}
