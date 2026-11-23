import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().trim().min(1, 'Username is required').optional(),
  password: z.string().min(1, 'Password is required').optional(),
})

export type TLoginSchema = z.infer<typeof loginSchema>
