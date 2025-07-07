import type { ErrorRequestHandler } from 'express'
import { INTERNAL_SERVER_ERROR } from '../constant/http-code'

const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  console.error(`❌ Error on ${req.method} ${req.path}:`, err)

  const status = err.status || INTERNAL_SERVER_ERROR
  const message = err.message || 'Internal server error.'

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}

export default errorHandler
