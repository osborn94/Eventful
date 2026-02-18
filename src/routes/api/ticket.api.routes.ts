import { Router } from "express"
import {
  attendFreeEventApi,
  viewTicketApi,
  viewUserTicketsApi
} from "../../controllers/api/ticket.api.controller.js"
import { protect } from "../../middlewares/auth.middleware.js"

const router = Router()

router.post("/events/:slug/attend", protect, attendFreeEventApi)
/**
 * @swagger
 * /tickets/{id}:
 *   get:
 *     summary: Get ticket by ID
 *     tags: [Tickets]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ticket details
 *       404:
 *         description: Ticket not found
 */
router.get("/:id", protect, viewTicketApi)
/**
 * @swagger
 * /tickets/me/all:
 *   get:
 *     summary: Get logged-in user's tickets
 *     tags: [Tickets]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of tickets
 */
router.get("/me/all", protect, viewUserTicketsApi)

export default router
