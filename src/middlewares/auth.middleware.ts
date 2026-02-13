import type { Request, Response, NextFunction } from "express"
import { verifyToken } from "../utils/jwt.js"
import User from "../models/user.model.js"

// export interface AuthRequest extends Request {
//   user?: any
// }

export interface AuthRequest<
  Params = {},
  ResBody = any,
  ReqBody = any,
  ReqQuery = any
> extends Request<Params, ResBody, ReqBody, ReqQuery> {
  user?: any
}


export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token

  if (!token) {
    return res.redirect("/login")
  }

  try {
    const decoded = verifyToken(token)

    const fullUser = await User.findById(decoded.id)

    if (!fullUser) {
      return res.redirect("/login")
    }

    req.user = fullUser
    res.locals.user = fullUser
    next()
  } catch {
    res.redirect("/login")
  }
}
