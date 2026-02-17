import type { Request, Response } from "express"
import { getUpcomingEventsService } from "../services/event.service.js"

export const homePage = async (req: Request, res: Response) => {
  const events = await getUpcomingEventsService()

  res.render("index", {
    title: "Welcome To Eventful",
    events,
    searchQuery: "",
    locationQuery: "",
    featuredEvents: events, // for carousel
    stats: {
      totalEvents: events.length,
      totalAttendees: 0,
      totalOrganizers: 0,
      totalCities: 0
    }

  })
}

