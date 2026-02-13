import reminderQueue from "./reminder.queue.js"
import { sendEmail } from "../utils/email.js"

reminderQueue.process(async (job) => {
  const { email, eventTitle, eventDate } = job.data

  await sendEmail(
    email,
    `Reminder: ${eventTitle}`,
    `Your event "${eventTitle}" is happening on ${eventDate}.`
  )
})
