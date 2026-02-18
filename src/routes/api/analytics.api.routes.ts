import { Router } from "express"
import { creatorAnalyticsApi } from "../../controllers/api/analytics.api.controller.js"
import { protect } from "../../middlewares/auth.middleware.js"

const router = Router()

/**
 * @swagger
 * /analytics:
 *   get:
 *     summary: Get creator analytics
 *     tags: [Analytics]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Analytics data
 *       403:
 *         description: Creator role required
 */

router.get("/", protect, creatorAnalyticsApi)

export default router