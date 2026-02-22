import type { Request, Response } from "express"
import {
  createEventService,
  getAllEventsService,
  getEventBySlugService,
  getCreatorEventsService,
  attendFreeEventService
} from "../../services/event.service.js"
import type { AuthRequest } from "../../middlewares/auth.middleware.js"


// CREATE EVENT
export const createEventApi = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, location, date, price } = req.body

    if (!title || !description || !location || !date || !price) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      })
    }

    const eventDate = new Date(date)
    const now = new Date()

    if (eventDate < now) {
      return res.status(400).json({
        success: false,
        message: "Event date cannot be in the past"
      })
    }

    const imagePath = req.file
      ? `/uploads/events/${req.file.filename}`
      : null

    const event = await createEventService(
      { title, description, location, date: eventDate, price, image: imagePath },
      req.user.id
    )

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event
    })

  } catch (error) {
    console.error("Create Event Error:", error)

    return res.status(500).json({
      success: false,
      message: "Failed to create event"
    })
  }
}


// LIST ALL EVENTS
export const listEventsApi = async (req: Request, res: Response) => {
  try {
    const events = await getAllEventsService()

    return res.status(200).json({
      success: true,
      count: events.length,
      data: events
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch events"
    })
  }
}


// GET SINGLE EVENT BY SLUG
export const getEventDetailsApi = async (req: Request<{ slug: string }>, res: Response) => {
  try {
    const event = await getEventBySlugService(req.params.slug)

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      })
    }

    return res.status(200).json({
      success: true,
      data: event
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch event"
    })
  }
}


// ATTEND FREE EVENT
export const attendFreeEventApi = async (
  req: AuthRequest<{ slug: string }>,
  res: Response
) => {
  try {
    await attendFreeEventService(req.params.slug, req.user.id)

    return res.status(200).json({
      success: true,
      message: "Successfully registered for event"
    })

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to attend event"
    })
  }
}




// GET CREATOR EVENTS
export const getCreatorEventsApi = async (req: AuthRequest, res: Response) => {
  try {
    const events = await getCreatorEventsService(req.user.id)

    return res.status(200).json({
      success: true,
      count: events.length,
      data: events
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch creator events"
    })
  }
}




// UPDATE EVENT
export const updateEventApi = async (
  req: AuthRequest<{ slug: string }>,
  res: Response
) => {
  try {
    const event = await getEventBySlugService(req.params.slug)

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      })
    }

    const newDate = new Date(req.body.date)
    const now = new Date()

    if (newDate < now) {
      return res.status(400).json({
        success: false,
        message: "Event date cannot be in the past"
      })
    }

    event.title = req.body.title
    event.description = req.body.description
    event.location = req.body.location
    event.price = req.body.price
    event.date = newDate

    await event.save()

    return res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: event
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update event"
    })
  }
}




// DELETE EVENT
export const deleteEventApi = async (
  req: AuthRequest<{ slug: string }>,
  res: Response
) => {
  try {
    const event = await getEventBySlugService(req.params.slug)

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      })
    }

    await event.deleteOne()

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully"
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete event"
    })
  }
}
