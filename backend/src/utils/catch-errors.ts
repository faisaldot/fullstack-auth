import type { NextFunction, Request, Response } from 'express'

type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>

export default function catchError(controller: AsyncController): AsyncController {
  return async (req, res, next) => {
    try {
      controller(req, res, next)
    }
    catch (error) {
      next(error)
    }
  }
}
