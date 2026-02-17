import type { Request, Response } from "express"
import Event from "../models/event.model.js"
import Ticket from "../models/ticket.model.js"
// import Application from "../models/application.model.js"
import type { AuthRequest } from "../middlewares/auth.middleware.js" 

export const dashboard = async (req: AuthRequest, res: Response) => {
  const user = req.user
  const page = Number(req.query.page) || 1
  const limit = 3

  if (!user) return res.redirect("/login")

  if (user.role === "creator") {

    const totalEvents = await Event.countDocuments({ creator: user.id })

    const myEvents = await Event.find({ creator: user.id })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })

    const totalEventPages = Math.ceil(totalEvents / limit)

    // IMPORTANT: tickets for creator’s events
    const tickets = await Ticket.find()
      .populate("user")
      .populate("event")
      .sort({ createdAt: -1 })

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
        totalTickets: tickets.length
      }
    })
  }


  // For Eventee Dashboard

  if (user.role === "eventee") {

    const availableEvents = await Event.find({ date: { $gte: new Date() } }).sort({ createdAt: -1 })
    const myTickets = await Ticket.find({ user: user.id }).populate("event")
    const appliedEvents = myTickets.map(ticket => ticket.event)

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


export const creatorDashboard = (req: Request, res: Response) => {
  res.render("dashboard/creator", {
    title: "Creator Dashboard",
    user: req.user
  });
};

