import { HumanMessage } from '@langchain/core/messages'
import { calculatorAgent } from '../agents/calculator/calculator.agent.js'

export const runCalculatorWorkflow = async (input: string) => {
  const result = await calculatorAgent.invoke({
    messages: [new HumanMessage(input)],
  })

  for (const message of result.messages) {
    console.log(`[${message.type}]: ${message.text}`)
  }

  console.log(result.llmCalls)
}
