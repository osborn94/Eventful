import { Router } from "express"
import { protect } from "../middlewares/auth.middleware.js"
import { setReminder } from "../controllers/reminder.controller.js"

const router = Router()

router.post(
  "/reminders",
  protect,
  setReminder
)

export default router
