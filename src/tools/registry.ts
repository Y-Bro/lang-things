import { calculatorTools } from './calculator/index.js'
import { ToolCall } from '@langchain/core/messages'

const allTools = [...calculatorTools]

export const toolMapEntries = allTools.map(tool => [tool.name, tool])

export const toolsByName = Object.fromEntries(toolMapEntries)

export const tools = Object.values(toolsByName)
