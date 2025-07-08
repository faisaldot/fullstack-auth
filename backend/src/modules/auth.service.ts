import { UserModel } from "./auth.model";

interface CreateAccountParam {
  email: string;
  password: string;
  userAgent?: string
}

export async function createAccount(data:CreateAccountParam) {
  // 1- Verifying existing user doesn't exits
    const existingUser = await UserModel.exists({email: data.email})
    if(existingUser){
      throw new Error("User already exist")
    }

    // 2- Creating new user
    const user = await UserModel.create({
      email: data.email,
      password: data.password
    })
}
