import Event from "../models/event.model.js"
import { generateSlug } from "../utils/slug.js"
import Ticket from "../models/ticket.model.js"

export const createEventService = async (
  data: any,
  creatorId: string
) => {
  const slug = generateSlug(data.title)

  return Event.create({
    ...data,
    slug,
    creator: creatorId
  })
}


export const getAllEventsService = async () => {
  return Event.find().sort({ date: 1 }).populate("creator", "name")
}

export const getUpcomingEventsService = async () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return Event.find({
    date: { $gte: today }
  })
    .sort({ date: 1 })      // nearest event first
    .limit(5)
    .populate("creator", "name")
}

export const getEventBySlugService = async (slug: string) => {
  return Event.findOne({ slug }).populate("creator", "name")
}

export const getCreatorEventsService = async (creatorId: string) => {
  return Event.find({ creator: creatorId })
}

// Attend free event
export const attendFreeEventService = async (slug: string, userId: string) => {
  const event = await Event.findOne({ slug })
  if (!event) throw new Error("Event not found")

  return Ticket.create({
    event: event._id,
    user: userId,
    paymentStatus: "free"
  })
}


