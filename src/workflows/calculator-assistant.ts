import { HumanMessage } from '@langchain/core/messages'
import { calculatorAssistantAgent } from '../agents/calculator-assistant/agent.js'

const runCalculatorAssistantWorfklow = async (input: string) => {
  const result = await calculatorAssistantAgent.invoke({ messages: [new HumanMessage(input)] })

  console.log(result)
}

export { runCalculatorAssistantWorfklow }
