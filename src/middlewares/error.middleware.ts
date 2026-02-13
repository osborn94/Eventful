import { error } from "console"
import type { Request, Response, NextFunction } from "express"

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.statusCode || 500

  res.status(status).render("error", {
    layout: false,
    error: err,
    message: err.message || "Something went wrong"
  })
}
