import { z } from 'zod'

export const ClassifierResponseSchema = z.object({
  intent: z.enum(['calculate', 'non_math', 'explain_concept']),
})

export const ParseResponseSchema = z.object({
  status: z.enum(['success', 'error']),
  steps: z
    .array(
      z.object({
        operation: z.enum(['add', 'subtract', 'multiply', 'divide']),
        operands: z.array(z.union([z.number(), z.enum(['previous'])])),
      }),
    )
    .optional(),
  error: z.string().optional(),
})

export type ParseResponse = z.infer<typeof ParseResponseSchema>
