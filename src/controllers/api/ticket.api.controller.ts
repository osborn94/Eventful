import type { Response } from "express"
import type { AuthRequest } from "../../middlewares/auth.middleware.js"
import { createTicketService } from "../../services/ticket.service.js"
import Event from "../../models/event.model.js"
import Ticket from "../../models/ticket.model.js"




// ATTEND FREE EVENT
export const attendFreeEventApi = async (
  req: AuthRequest<{ slug: string }>,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      })
    }

    const event = await Event.findOne({ slug: req.params.slug })

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      })
    }

    if (event.price > 0) {
      return res.status(400).json({
        success: false,
        message: "This is a paid event"
      })
    }

    const ticket = await createTicketService(
      event._id.toString(),
      req.user.id,
      "free"
    )

    return res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      data: ticket
    })

  } catch (error) {
    console.error("Attend Free Event API Error:", error)

    return res.status(500).json({
      success: false,
      message: "Failed to create ticket"
    })
  }
}




// VIEW SINGLE TICKET
export const viewTicketApi = async (
  req: AuthRequest<{ id: string }>,
  res: Response
) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("event")
      .populate("user")

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found"
      })
    }

    if (ticket.user._id.toString() !== req.user.id) {
        return res.status(403).json({
            success: false,
            message: "Access denied"
        })
    }


    return res.status(200).json({
      success: true,
      data: ticket
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch ticket"
    })
  }
}




// VIEW USER TICKETS
export const viewUserTicketsApi = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      })
    }

    const tickets = await Ticket.find({ user: req.user.id })
      .populate("event")
      .populate("user")

    return res.status(200).json({
      success: true,
      count: tickets.length,
      data: tickets
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user tickets"
    })
  }
}
