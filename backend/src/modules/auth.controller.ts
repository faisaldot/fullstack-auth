import z, { string } from 'zod'
import catchError from '../utils/catch-errors'

// Register schema
const registerSchema = z.object({
  email: z.string().email().min(1).max(255),
  password: z.string().min(6).max(255),
  confirmPassword: z.string().min(6).max(255),
  userAgent: string().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Password and confirm password should be matched!',
  path: ['confirmPassword'],
})

export const handleRegister = catchError(async (req, res) => {
  const register = registerSchema.parse({
    ...req.body,
    userAgent: req.headers['user-agent'],
  })
})
