import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import connectDb from './config/db'
import { OK } from './constant/http-code'
import errorHandler from './middleware/error-handler'
import authRoute from './modules/auth.route'

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
app.get('/health', (req, res) => {
  res.status(OK).json({
    health: 'ok',
  })
})

// Routes
app.use('/auth', authRoute)

// Error handler middleware
app.use(errorHandler)

// Listening to server
app.listen(PORT, () => {
  connectDb()
  console.log(`Server listening on http://localhost:${PORT}`)
})
