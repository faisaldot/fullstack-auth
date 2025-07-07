import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI

export default async function connectDb() {
  try {
    await mongoose.connect(MONGO_URI!)
    console.log(`Database connected to successfully.`)
  }
  catch (error) {
    console.log(`Failed to connect with database: ${error}`)
  }
}
