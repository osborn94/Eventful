import { Router } from "express"
import { homePageApi } from "../../controllers/api/home.api.controller.js"

const router = Router()

/**
 * @swagger
 * /home:
 *   get:
 *     summary: Get homepage data
 *     tags: [Home]
 *     responses:
 *       200:
 *         description: Homepage events and stats
 */

router.get("/", homePageApi)

export default router