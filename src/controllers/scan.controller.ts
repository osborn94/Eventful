import type { Response } from "express"
import type { AuthRequest } from "../middlewares/auth.middleware.js"
import Ticket from "../models/ticket.model.js"
import type { IEvent } from "../models/event.model.js"

export const scanTicket = async (
  req: AuthRequest,
  res: Response
) => {
  const { ticketId } = req.body
  const currentUser = req.user 

  const ticket = await Ticket.findById(ticketId)
    .populate<{ event: IEvent }>("event")
    .populate("user")

  if (!ticket)
    return res.status(404).json({ message: "Invalid ticket" })

  // Ensure event exists
  if (!ticket.event)
    return res.status(404).json({ message: "Event no longer exists" })

  if (ticket.event.creator.toString() !== currentUser.id) {
    return res.status(403).json({
      message: "You are not authorized to scan tickets for this event"
    })
  }

  if (ticket.scanned)
    return res.status(400).json({ message: "Ticket already used" })

  ticket.scanned = true
  await ticket.save()

  res.json({
    message: "Entry granted ✅",
    user: ticket.user,
    event: ticket.event
  })
}
