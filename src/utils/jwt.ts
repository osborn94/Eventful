import jwt from "jsonwebtoken"
import type { TokenPayload } from "../types/auth.types.js"


export const signToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "7d"
  })
}

export const verifyToken = (token: string): TokenPayload => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string)

  return decoded as TokenPayload
}
