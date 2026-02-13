import { Router } from "express"
import { protect } from "../middlewares/auth.middleware.js"
import {
  initializePayment,
  verifyPayment
} from "../controllers/payment.controller.js"

const router = Router()

router.get(
  "/checkout/:eventId",
  protect,
  initializePayment
)

router.get(
  "/payments/verify",
  protect,
  verifyPayment
)

export default router
