import { z } from 'zod'

export const ClassifierResponseSchema = z.object({
  intent: z.enum(['calculate', 'non_math', 'explain_concept']),
})

export const ParseResponseSchema = z.discriminatedUnion('ok', [
  z.object({
    ok: z.literal(true),
    steps: z.array(
      z.object({
        operation: z.enum(['add', 'subtract', 'multiply', 'divide']),
        operands: z.array(z.union([z.number(), z.literal('previous')])),
      }),
    ),
  }),

  z.object({
    ok: z.literal(false),
    error: z.string(),
  }),
])

export type ParseResponse = z.infer<typeof ParseResponseSchema>
