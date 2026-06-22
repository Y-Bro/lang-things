import { tool } from '@langchain/core/tools'
import * as z from 'zod'

const add = (args: Record<string, number>): number => {
  const { a, b } = args

  if (!a || !b) {
    throw Error
  }

  return a + b
}

const addTool = tool(({ a, b }) => add({ a, b }), {
  name: 'add_tool',
  description: 'Add two numbers',
  schema: z.object({
    a: z.number().describe('First number'),
    b: z.number().describe('Second number'),
  }),
})

export { addTool }
