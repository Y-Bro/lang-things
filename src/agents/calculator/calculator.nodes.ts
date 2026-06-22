import { AIMessage, SystemMessage, ToolMessage } from '@langchain/core/messages'
import { GraphNode } from '@langchain/langgraph'
import { CalculatorState } from './calculator.state.js'
import { haikuWithTools } from '../../models/anthropic.model.js'
import { calculatorSystemPrompt } from './calculator.prompt.js'
import { toolsByName } from '../../tools/registry.js'

const llmCall: GraphNode<typeof CalculatorState> = async state => {
  const response = await haikuWithTools.invoke([new SystemMessage(calculatorSystemPrompt), ...state.messages])

  return {
    messages: [response],
    llmCalls: 1,
  }
}

const toolNode: GraphNode<typeof CalculatorState> = async state => {
  const lastMessage = state.messages.at(-1)

  if (!lastMessage || !AIMessage.isInstance(lastMessage)) {
    return { messages: [] }
  }

  const result: ToolMessage[] = []

  for (const toolCall of lastMessage.tool_calls ?? []) {
    const tool = toolsByName[toolCall.name]
    const observation = await tool.invoke(toolCall)
    result.push(observation)
  }

  return { messages: result }
}
