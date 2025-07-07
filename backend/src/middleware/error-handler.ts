import type { ErrorRequestHandler } from 'express'

const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  console.error(`❌ Error on ${req.method} ${req.path}:`, err)

  const status = err.status || 500
  const message = err.message || 'Internal server error.'

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}

export default errorHandler
