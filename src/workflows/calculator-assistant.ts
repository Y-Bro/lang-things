import { HumanMessage } from '@langchain/core/messages'
import { calculatorAssistantAgent } from '../agents/calculator-assistant/agent.js'

const runCalculatorAssistantWorfklow = async (input: string) => {
  const result = await calculatorAssistantAgent.invoke({ messages: [new HumanMessage(input)] })

  console.dir(result, { depth: null })
}

export { runCalculatorAssistantWorfklow }
