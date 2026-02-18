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

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of events
 */
router.get("/", listEventsApi)

/**
 * @swagger
 * /events/{slug}:
 *   get:
 *     summary: Get event details by slug
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event details
 *       404:
 *         description: Event not found
 */
router.get("/:slug", getEventDetailsApi)


/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - location
 *               - date
 *               - price
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", protect, createEventApi)

router.post("/:slug/attend", protect, attendFreeEventApi)

router.get("/creator/me", protect, getCreatorEventsApi)
router.put("/:slug", protect, updateEventApi)

/**
 * @swagger
 * /events/{slug}:
 *   delete:
 *     summary: Delete an event
 *     tags: [Events]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event deleted
 *       404:
 *         description: Event not found
 */
router.delete("/:slug", protect, deleteEventApi)

export default router
