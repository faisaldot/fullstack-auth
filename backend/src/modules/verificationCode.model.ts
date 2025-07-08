import mongoose from 'mongoose'

export enum VerificationCodeType {
  EmailVerification = 'email_verification',
  PasswordReset = 'password_reset',
}

interface IVerificationCode {
  userId: mongoose.Types.ObjectId
  type: VerificationCodeType
  createdAt: Date
  expireAt: Date
}

// Verification Schema
const verificationCodeSchema = new mongoose.Schema<IVerificationCode>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' , index: true},
  type: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now() },
  expireAt: { type: Date, required: true },
})

// Model
export const VerificationCodeModel = mongoose.model<IVerificationCode>(
  'VerificationCode',
  verificationCodeSchema,
  'verification_codes',
)
