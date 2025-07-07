import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import connectDb from './config/db'
import { OK } from './constant/http-code'
import errorHandler from './middleware/error-handler'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 9001
const APP_ORIGIN = process.env.APP_ORIGIN!

// Application level middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  }),
)

// Health check route
app.get('/', (req, res) => {
  res.status(OK).json({
    health: 'ok',
  })
})

// Error handler middleware
app.use(errorHandler)

// Listening to server
app.listen(PORT, () => {
  connectDb()
  console.log(`Server listening on http://localhost:${PORT}`)
})
