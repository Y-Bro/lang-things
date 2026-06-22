import { ChatAnthropic } from '@langchain/anthropic'

const haiku = new ChatAnthropic({
  model: 'claude-haiku-4-5',
  temperature: 0.2,
})

export { haiku }
