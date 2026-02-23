import type { Request, Response, NextFunction } from "express"
const rateLimitMiddleware = (_req: Request, _res: Response, next: NextFunction) => next()
export { rateLimitMiddleware }