import type { NextFunction, Request, Response } from "express";

type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

const catchError =
  (controller: AsyncController): AsyncController =>
  async (req, res, next) => {
    try {
      controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default catchError;
