import type { Document } from 'mongoose'
import { model, Schema } from 'mongoose'
import { compareValue, hashValue } from '../utils/bcrypt'

// User type interface
interface IUser extends Document {
  email: string
  password: string
  verified: boolean
  createdAt: Date
  updatedAt: Date
  comparePassword: (val: string) => Promise<boolean>
}

// User Schema
const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, required: true, default: false },
})

// Pre schema hook for hashing password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  this.password = await hashValue(this.password)
  next()
})

// User schema method for compare password
userSchema.methods.comparePassword = async function (val: string) {
  return compareValue(val, this.password)
}

// Exporting UserModel
export const UserModel = model('User', userSchema)
