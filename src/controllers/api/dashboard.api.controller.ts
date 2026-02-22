import type { Response } from "express"
import Event from "../../models/event.model.js"
import Ticket from "../../models/ticket.model.js"
import type { AuthRequest } from "../../middlewares/auth.middleware.js"

export const dashboardApi = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user
    const page = Number(req.query.page) || 1
    const limit = 3

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      })
    }

    // CREATOR DASHBOARD
    if (user.role === "creator") {

      const totalEvents = await Event.countDocuments({ creator: user.id })

      const myEvents = await Event.find({ creator: user.id })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })

      const totalEventPages = Math.ceil(totalEvents / limit)

      const tickets = await Ticket.find()
        .populate("user")
        .populate("event")
        .sort({ createdAt: -1 })

      return res.status(200).json({
        success: true,
        role: "creator",
        data: {
          user,
          myEvents,
          tickets,
          pagination: {
            totalEvents,
            totalEventPages,
            currentPage: page
          },
          stats: {
            totalEvents,
            totalTickets: tickets.length
          }
        }
      })
    }

    // EVENTEE DASHBOARD
    if (user.role === "eventee") {

      const availableEvents = await Event.find({
        date: { $gte: new Date() }
      }).sort({ createdAt: -1 })

      const myTickets = await Ticket.find({ user: user.id })
        .populate("event")

      const appliedEvents = myTickets.map(ticket => ticket.event)

      return res.status(200).json({
        success: true,
        role: "eventee",
        data: {
          user,
          availableEvents,
          appliedEvents,
          myTickets
        }
      })
    }

    return res.status(400).json({
      success: false,
      message: "Invalid user role"
    })

  } catch (error) {
    console.error("Dashboard API Error:", error)

    return res.status(500).json({
      success: false,
      message: "Failed to load dashboard"
    })
  }
}
