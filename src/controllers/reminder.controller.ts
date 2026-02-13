import type { Response } from "express"
import type { AuthRequest } from "../middlewares/auth.middleware.js"
import Reminder from "../models/reminder.model.js"
import Event from "../models/event.model.js"
import { scheduleReminder } from "../services/reminder.service.js"

export const setReminder = async (
  req: AuthRequest,
  res: Response
) => {
  const { eventId, reminderOption, customReminderTime } = req.body

  const event = await Event.findById(eventId)
  if (!event) return res.status(404).send("Event not found")

  let reminderTime: Date

  const eventDate = new Date(event.date)

  // Predefined options
  if (reminderOption === "10m") {
    reminderTime = new Date(eventDate.getTime() - 10 * 60 * 1000)
  } 
  else if (reminderOption === "1h") {
    reminderTime = new Date(eventDate.getTime() - 60 * 60 * 1000)
  } 
  else if (reminderOption === "1d") {
    reminderTime = new Date(eventDate.getTime() - 24 * 60 * 60 * 1000)
  } 
  else if (reminderOption === "custom") {
    reminderTime = new Date(customReminderTime)

    if (isNaN(reminderTime.getTime())) {
      return res.status(400).send("Invalid custom reminder time")
    }

    if (reminderTime >= eventDate) {
      return res.status(400).send("Reminder must be before event date")
    }
  } 
  else {
    return res.status(400).send("Invalid reminder option")
  }

  // Prevent past reminders
  if (reminderTime <= new Date()) {
    return res.status(400).send("Reminder time must be in the future")
  }

  // Prevent duplicates
  const existingReminder = await Reminder.findOne({
    user: req.user.id,
    event: eventId
  })

  if (existingReminder) {
    return res.redirect(`/events/${event.slug}`)
  }

  await Reminder.create({
    user: req.user.id,
    event: eventId,
    reminderTime
  })

  await scheduleReminder(
    req.user.email,
    event.title,
    event.date,
    reminderTime
  )

  // res.redirect(`/events/${event.slug}`)
  // res.redirect(req.get("Referrer") || `/events/${event.slug}`)
  res.redirect("back")

}



