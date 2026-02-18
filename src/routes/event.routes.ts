import { Router } from "express"
import {
  createEvent,
  listEvents,
  eventDetails,
  creatorEvents,
  attendFreeEvent,
  getCreatorEventDetails,
  getEditEventPage,
  updateEvent,
  deleteEvent
} from "../controllers/event.controller.js"
import { protect } from "../middlewares/auth.middleware.js"
import { authorize } from "../middlewares/role.middleware.js"
import { upload } from "../middlewares/upload.middleware.js"

const router = Router()

// Public

router.get("/events", listEvents)

router.get("/events/:slug", protect, eventDetails)

// Creator
router.get(
  "/creator/events",
  protect,
  authorize("creator"),
  creatorEvents
)

router.get(
  "/creator/events/:slug",
  protect,
  getCreatorEventDetails
)

// edit event route
router.get(
  "/creator/events/:slug/edit",
  protect,
  getEditEventPage
)

router.put(
  "/creator/events/:slug",
  protect,
  updateEvent
)

router.delete(
  "/creator/events/:slug",
  protect,
  deleteEvent
)

// create event
router.post("/events", protect,authorize("creator"), upload.single("image"), createEvent)

// Attend free event
router.post("/events/:slug/attend", protect, attendFreeEvent)


export default router
