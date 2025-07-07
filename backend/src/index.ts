import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import connectDb from './config/db'
import errorHandler from './middleware/error-handler'
import 'dotenv/config'

const PORT = process.env.PORT || 9001

const app = express()

// Application level middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
  cors({
    origin: process.env.APP_ORIGIN,
    credentials: true,
  }),
)

// Health check route
app.get('/', (req, res) => {
  throw new Error('test error')

  res.status(200).json({
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
