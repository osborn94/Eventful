import { Router } from "express"
import { dashboardApi } from "../../controllers/api/dashboard.api.controller.js"
import { protect } from "../../middlewares/auth.middleware.js"

const router = Router()

router.get("/", protect, dashboardApi)

export default router
