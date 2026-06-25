import { ChatGoogle } from '@langchain/google'
import { tools } from '../tools/registry.js'
import { ClassifierResponseSchema, ParseResponseSchema } from '../agents/calculator-assistant/schemas.js'

const geminiV2Flash = new ChatGoogle({
  model: 'gemini-2.5-flash',
  temperature: 0.2,
})

const classifierGeminiModel = geminiV2Flash.withStructuredOutput(ClassifierResponseSchema)
const parserGeminiModel = geminiV2Flash.withStructuredOutput(ParseResponseSchema)

export { geminiV2Flash, classifierGeminiModel, parserGeminiModel }
