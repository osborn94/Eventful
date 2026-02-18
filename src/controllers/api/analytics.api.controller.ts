import type { Response } from "express"
import type { AuthRequest } from "../../middlewares/auth.middleware.js"
import { getCreatorAnalytics } from "../../services/analytics.service.js"

export const creatorAnalyticsApi = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      })
    }

    if (req.user.role !== "creator") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Creator role required."
      })
    }

    const stats = await getCreatorAnalytics(req.user.id)

    return res.status(200).json({
      success: true,
      data: {
        user: {
          id: req.user.id,
          role: req.user.role
        },
        analytics: stats
      }
    })

  } catch (error) {
    console.error("Analytics API Error:", error)

    return res.status(500).json({
      success: false,
      message: "Failed to load analytics"
    })
  }
}
