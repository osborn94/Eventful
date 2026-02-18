import { Router } from "express"
import { protect } from "../middlewares/auth.middleware.js"
import {
  attendFreeEvent,
  viewUserTickets,
  viewTicket
} from "../controllers/ticket.controller.js"

const router = Router()

router.post(
  "/events/:slug/attend",
  protect,
  attendFreeEvent
)

router.get("/tickets", protect, viewUserTickets)


router.get(
  "/tickets/:id",
  protect,
  viewTicket
)

export default router