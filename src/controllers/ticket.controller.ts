import type { Response } from "express"
import type { AuthRequest } from "../middlewares/auth.middleware.js"
import { createTicketService } from "../services/ticket.service.js"
import Event from "../models/event.model.js"
import Ticket from "../models/ticket.model.js"


interface TicketParams {
    slug: string,
    id: string
}

export const attendFreeEvent = async (
    req: AuthRequest<TicketParams>,
    res: Response
) => {
    const event = await Event.findOne({ slug: req.params.slug })
    if (!event) return res.status(404).send("Event not found")

    if (event.price > 0)
        return res.status(400).send("This is a paid event")

    const ticket = await createTicketService(
        event._id.toString(),
        req.user.id,
        "free"
    )

    res.redirect(`/tickets/${ticket._id}`)

}


export const viewTicket = async (
  req: AuthRequest<TicketParams>,
  res: Response
) => {
  const ticket = await Ticket.findById(req.params.id)
    .populate("event")
    .populate("user")

  if (!ticket) return res.status(404).send("Ticket not found")

  res.render("tickets/view", {title: ticket.event, ticket })
}

export const viewUserTickets = async (req: AuthRequest, res: Response) => {
  const tickets = await Ticket.find({ user: req.user.id })
    .populate("event")
    .populate("user")

  res.render("tickets/view", {
    title: "My Tickets",
    tickets
  })
}

