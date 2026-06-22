import { tool } from '@langchain/core/tools'
import z from 'zod'

const divide = (args: Record<string, number>): number => {
  const { a, b } = args

  if (!a || !b) {
    throw new Error('Invalid Input')
  }

  return a / b
}

const divideTool = tool(({ a, b }) => divide({ a, b }), {
  name: 'divide',
  description: 'divide two numbers',
  schema: z.object({
    a: z.number(),
    b: z.number(),
  }),
})

export { divideTool }
