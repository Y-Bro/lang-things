import { ChatGoogle } from '@langchain/google'
import { tools } from '../tools/registry.js'

const geminiV2Flash = new ChatGoogle({
  model: 'gemini-2.5-flash',
  temperature: 0.2,
})

const geminiV2FlashWithTools = geminiV2Flash.bindTools(tools as any)

export { geminiV2Flash, geminiV2FlashWithTools }
