import type { Request, Response } from "express"
import { getUpcomingEventsService } from "../../services/event.service.js"

export const homePageApi = async (req: Request, res: Response) => {
  try {
    const events = await getUpcomingEventsService()

    return res.status(200).json({
      success: true,
      data: {
        featuredEvents: events,
        events,
        stats: {
          totalEvents: events.length,
          totalAttendees: 0,
          totalOrganizers: 0,
          totalCities: 0
        }
      }
    })

  } catch (error) {
    console.error("Home API Error:", error)

    return res.status(500).json({
      success: false,
      message: "Failed to load homepage data"
    })
  }
}
