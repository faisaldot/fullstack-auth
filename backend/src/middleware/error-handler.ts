import type { ErrorRequestHandler, Response } from 'express'
import z from 'zod'
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from '../constant/http-code'

function handleZodError(res: Response, err: z.ZodError) {
  const errors = err.issues.map(e => ({
    path: e.path,
    message: e.message,
  }))
  return res.status(BAD_REQUEST).json({
    message: err.message,
    errors,
  })
}

const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  // Log error details
  console.error(`Error on path: ${req.path}`)
  console.error(err.stack || err)

  // Zod validation error
  if (err instanceof z.ZodError) {
    handleZodError(res, err)
  }

  // Prepare error respnose
  const status = err.status || INTERNAL_SERVER_ERROR
  const message = err.message || 'Internal Server Error'

  const response: Record<string, any> = { message }

  // Only show stack trace in development
  if (process.env.NODE_ENV === 'development' && err.stack) {
    response.stack = err.stack
  }

  res.status(status).json(response)
}

export default errorHandler
