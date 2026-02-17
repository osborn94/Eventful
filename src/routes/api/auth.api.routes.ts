import { Router } from "express"
import { registerApi, loginApi, logoutApi } from "../../controllers/api/auth.api.controller.js"
import { authLimiter } from "../../middlewares/rateLimit.js"

const router = Router()

router.post("/register", registerApi)
router.post("/login", authLimiter, loginApi)
router.post("/logout", logoutApi)

export default router
