import type { Request, Response } from "express"
import Event from "../models/event.model.js"
import Ticket from "../models/ticket.model.js"
// import Application from "../models/application.model.js"
import type { AuthRequest } from "../middlewares/auth.middleware.js" 

export const dashboard = async (req: AuthRequest, res: Response) => {
 const user = req.user

  if (!user) return res.redirect("/login")

  if (user.role === "creator") {

    const totalEvents = await Event.countDocuments({ creator: user.id })

    const totalTickets = await Ticket.countDocuments({
      user: user.id
    })

    const myEvents = await Event.find({ creator: user.id })

    return res.render("creator", {
      layout: "layouts/dashboard",
      title: "Creator Dashboard",
      user,
      myEvents,
      stats: {       
        totalEvents,
        totalTickets
      }
     
    })
  }

  // For Eventee Dashboard

  if (user.role === "eventee") {

    const availableEvents = await Event.find({ date: { $gte: new Date() } })
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

