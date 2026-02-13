import type { Response } from "express"
import type { AuthRequest } from "../middlewares/auth.middleware.js"
import Ticket from "../models/ticket.model.js"

export const scanTicket = async (
  req: AuthRequest,
  res: Response
) => {
  const { ticketId } = req.body

  const ticket = await Ticket.findById(ticketId)
    .populate("event")
    .populate("user")

  if (!ticket)
    return res.status(404).json({ message: "Invalid ticket" })

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
