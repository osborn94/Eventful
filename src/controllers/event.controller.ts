import type { Request, Response } from "express"
import {
  createEventService,
  getAllEventsService,
  getEventBySlugService,
  getCreatorEventsService,
  attendFreeEventService
} from "../services/event.service.js"
import type { AuthRequest } from "../middlewares/auth.middleware.js"

// create event service

export const createEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, location, date, price } = req.body

    if (!title || !description || !location || !date || !price) {
      res.redirect(req.get("referer") || "/creator")

      // return res.redirect("/creator")
    }

    
    const eventDate = new Date(date)
    const now = new Date()

    if (eventDate < now) {
      console.log("Date cannot be in the past")
      return res.redirect(req.get("referer") || "/creator")
    }

    await createEventService(
      { title, description, location, date: eventDate, price },
      req.user.id
    )


    // res.redirect("/creator")
    res.redirect(req.get("referer") || "/creator")


  } catch (error) {
    console.error("Create Event Error:", error)
    res.redirect(req.get("referer") || "/creator")

    // res.redirect("/creator")
  }
}

// export const createEvent = async (req: AuthRequest, res: Response) => {
//   await createEventService(req.body, req.user.id)
//   res.redirect("/creator/events")
// }

export const listEvents = async (req: Request, res: Response) => {
  const events = await getAllEventsService()
  res.render("events/index", {title: "Events", events })
}


// This is for eventee to view single event details and apply for events
interface EventParams {
    slug: string
}

export const eventDetails = async (req: Request<EventParams>, res: Response) => {
  const event = await getEventBySlugService(req.params.slug)
  if (!event) return res.status(404).send("Event not found")

  res.render("events/details", {title: event.title, event })
}


// Attend free event
interface AttendEventParams {
  slug: string
}
export const attendFreeEvent = async (req: AuthRequest<AttendEventParams>, res: Response) => {
  try {
    await attendFreeEventService(req.params.slug, req.user.id)
    res.redirect(req.get("referer") || "/eventee")
  } catch (error) {
    res.redirect("/eventee")
  }
}

export const creatorEvents = async (req: AuthRequest, res: Response) => {
  const events = await getCreatorEventsService(req.user.id)
  res.render("events/creator", { events })
}

// FOR SINGLE EVENT MANAGEMENT BY CREATOR
interface CreatorEventParams {
  slug: string
}
export const getCreatorEventDetails = async (req: AuthRequest<CreatorEventParams>, res: Response) => {

  const event = await getEventBySlugService(req.params.slug)

  if (!event) {
    return res.status(404).send("Event not found")
  }

  // SECURITY CHECK 
  // if (event.creator.toString() !== req.user.id) {
  //   return res.status(403).send("Unauthorized")
  // }

  res.render("events/manage", {title: event.title, event })
}


// edit event button
interface EditEventParams {
  slug: string
}
export const getEditEventPage = async (req: AuthRequest<EditEventParams>, res: Response) => {
  const event = await getEventBySlugService(req.params.slug)

  if (!event) return res.status(404).send("Event not found")

  // if (event.creator.toString() !== req.user.id) {
  //   return res.status(403).send("Unauthorized")
  // }

  res.render("events/edit", {title: event.title, event })
}

// To update event details by creator
interface UpdateEventParams {
  slug: string
}
export const updateEvent = async (req: AuthRequest<UpdateEventParams>, res: Response) => {
  const event = await getEventBySlugService(req.params.slug)

  if (!event) return res.status(404).send("Event not found")

  const newDate = new Date(req.body.date)
  const now = new Date()

  if (newDate < now) {
    return res.status(400).send("Event date cannot be in the past")
  }

  event.title = req.body.title
  event.description = req.body.description
  event.location = req.body.location
  event.price = req.body.price
  event.date = newDate

  await event.save()

  // res.redirect(`/creator/events/${event.slug}`)
  res.redirect("/dashboard/creator")
}


// To delete event by creator
interface DeleteEventParams {
  slug: string
}
export const deleteEvent = async (req: AuthRequest<DeleteEventParams>, res: Response) => {
  const event = await getEventBySlugService(req.params.slug)

  if (!event) return res.status(404).send("Event not found")


  await event.deleteOne()

  res.redirect("/dashboard/creator")
}

