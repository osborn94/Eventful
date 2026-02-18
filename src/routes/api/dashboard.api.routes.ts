import { Router } from "express"
import { dashboardApi } from "../../controllers/api/dashboard.api.controller.js"
import { protect } from "../../middlewares/auth.middleware.js"

const router = Router()

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Get dashboard data (creator or eventee)
 *     tags: [Dashboard]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dashboard data
 *       401:
 *         description: Unauthorized
 */

router.get("/", protect, dashboardApi)

export default router
