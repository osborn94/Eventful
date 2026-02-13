import type { Response, NextFunction } from "express"
import type { AuthRequest } from "./auth.middleware.js"

export const authorize =
  (...roles: string[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send("Access denied")
    }
    next()
  }
