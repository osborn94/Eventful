import Event from "../models/event.model.js"
import { generateSlug } from "../utils/slug.js"
import Ticket from "../models/ticket.model.js"
import { redisClient } from "../config/redis.js"


export const createEventService = async (
  data: any,
  creatorId: string
) => {
  const slug = generateSlug(data.title)

  const event = Event.create({
    ...data,
    slug,
    creator: creatorId
  })
  await invalidateEventsCache()
  return event
}


const ALL_EVENTS_CACHE_KEY = "events:all"
const CACHE_TTL = 60 * 5 // 5 minutes

export const getAllEventsService = async () => {
  // Check cache first
  const cached = await redisClient.get(ALL_EVENTS_CACHE_KEY)
  if (cached) {
    return JSON.parse(cached)
  }

  // Query DB if cache miss
  const events = await Event.find().sort({ date: 1 }).populate("creator", "name").lean()

  // Store in cache
  await redisClient.set(ALL_EVENTS_CACHE_KEY, JSON.stringify(events), "EX", CACHE_TTL)

  return events
}

export const invalidateEventsCache = async () => {
  await redisClient.del(ALL_EVENTS_CACHE_KEY)
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


