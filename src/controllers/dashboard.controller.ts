import type { Request, Response } from "express"
import Event from "../models/event.model.js"
import Ticket from "../models/ticket.model.js"
import type { AuthRequest } from "../middlewares/auth.middleware.js" 

export const dashboard = async (req: AuthRequest, res: Response) => {
  const user = req.user
  const page = Number(req.query.page) || 1
  const limit = 3

  if (!user) return res.redirect("/login")

  /* CREATOR DASHBOARD */

  if (user.role === "creator") {

    // Get creator events
    const totalEvents = await Event.countDocuments({ creator: user.id })

    const myEvents = await Event.find({ creator: user.id })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })

    const totalEventPages = Math.ceil(totalEvents / limit)

    // Get event IDs for this creator
    const creatorEvents = await Event.find({ creator: user.id }).select("_id")
    const eventIds = creatorEvents.map(e => e._id)

    // Fetch ONLY tickets for this creator's events
    const tickets = await Ticket.find({
      event: { $in: eventIds }
    })
      .populate("user")
      .populate("event")
      .sort({ createdAt: -1 })

    // Calculate proper stats (scoped)
    const totalTickets = tickets.length

    const totalRevenue = tickets
      .filter(ticket => ticket.paymentStatus === "paid")
      .reduce((sum, ticket) => sum + (ticket.amount || 0), 0)

    return res.render("creator", {
      layout: "layouts/dashboard",
      title: "Creator Dashboard",
      user,
      myEvents,
      tickets,
      totalEventPages,
      currentPage: page,
      stats: {
        totalEvents,
        totalTickets,
        totalRevenue
      }
    })
  }


  /* EVENTEE DASHBOARD  */

  if (user.role === "eventee") {

    const availableEvents = await Event.find({
      date: { $gte: new Date() }
    }).sort({ createdAt: -1 })

    const myTickets = await Ticket.find({
      user: user.id
    }).populate("event")

    const appliedEvents = myTickets.map(ticket => ticket.event).filter(event => event !== null)

    return res.render("eventee", {
      layout: "layouts/dashboard",
      title: "My Dashboard",
      query: req.query, 
      user,
      availableEvents,
      appliedEvents,
      myTickets
    })
  }
}