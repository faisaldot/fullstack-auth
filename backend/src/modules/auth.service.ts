import { oneYearFromNow } from '../utils/date'
import { UserModel } from './auth.model'
import { VerificationCodeModel, VerificationCodeType } from './verificationCode.model'

interface CreateAccountParam {
  email: string
  password: string
  userAgent?: string
}

export async function createAccount(data: CreateAccountParam) {
  // 1- Verifying existing user doesn't exits
  const existingUser = await UserModel.exists({ email: data.email })
  if (existingUser) {
    throw new Error('User already exist')
  }

  // 2- Creating new user
  const newUser = await UserModel.create({
    email: data.email,
    password: data.password,
  })

  // 3- Createing verification code
  const verificationCode = await VerificationCodeModel.create({
    userId: newUser._id,
    type: VerificationCodeType.EmailVerification,
    expireAt: oneYearFromNow(),
  })
}
