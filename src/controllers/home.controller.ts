import type { Request, Response } from "express"
import { getUpcomingEventsService } from "../services/event.service.js"

export const homePage = async (req: Request, res: Response) => {
  const events = await getUpcomingEventsService()

  res.render("index", {
    title: "Welcome To Eventful",
    events
  })
}

