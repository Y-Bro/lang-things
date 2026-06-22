import { ChatAnthropic } from '@langchain/anthropic'
import { tools } from '../tools/registry.js'

const haiku = new ChatAnthropic({
  model: 'claude-haiku-4-5',
  temperature: 0.2,
})

const haikuWithTools = haiku.bindTools(tools as any)

export { haiku, haikuWithTools }
