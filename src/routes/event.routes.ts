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

const router = Router()

// Public

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/events", listEvents)

/**
 * @swagger
 * /events/{slug}:
 *   get:
 *     summary: Get event details by slug
 *     tags: [Events]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique event slug
 *     responses:
 *       200:
 *         description: Event details
 *       404:
 *         description: Event not found
 */

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
router.post("/events", protect,authorize("creator"), createEvent)

// Attend free event
router.post("/events/:slug/attend", protect, attendFreeEvent)


export default router
