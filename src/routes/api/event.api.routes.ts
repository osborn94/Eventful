import { Router } from "express"
import {
  createEventApi,
  listEventsApi,
  getEventDetailsApi,
  attendFreeEventApi,
  getCreatorEventsApi,
  updateEventApi,
  deleteEventApi
} from "../../controllers/api/event.api.controller.js"
import { protect } from "../../middlewares/auth.middleware.js"

const router = Router()

router.get("/", listEventsApi)
router.get("/:slug", getEventDetailsApi)

router.post("/", protect, createEventApi)
router.post("/:slug/attend", protect, attendFreeEventApi)

router.get("/creator/me", protect, getCreatorEventsApi)
router.put("/:slug", protect, updateEventApi)
router.delete("/:slug", protect, deleteEventApi)

export default router
