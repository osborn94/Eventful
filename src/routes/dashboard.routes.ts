import { Router } from "express"
import { protect } from "../middlewares/auth.middleware.js"
import { dashboard } from "../controllers/dashboard.controller.js"

const router = Router()

router.get("/creator", protect, dashboard)
router.get("/eventee", protect, dashboard)

export default router


