import type { Response } from "express"
import type { AuthRequest } from "../middlewares/auth.middleware.js"
import { getCreatorAnalytics } from "../services/analytics.service.js"

export const creatorAnalytics = async (
  req: AuthRequest,
  res: Response
) => {
  const stats = await getCreatorAnalytics(req.user.id)

  res.render("analytics", {
    layout: "layouts/dashboard",
    title: "Analytics",
    user: req.user,
    ...stats
  })
}
