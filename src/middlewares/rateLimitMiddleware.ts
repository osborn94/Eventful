import type { Request, Response, NextFunction } from "express"
import { rateLimiter } from "../middlewares/rateLimit.js"

export const rateLimitMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await rateLimiter.consume(req.ip as string)
    next()
  } catch {
    res.status(429).send("Too many requests, please try again later.")
  }
}