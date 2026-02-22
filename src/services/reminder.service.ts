import { reminderQueue } from "../jobs/reminder.queue.js"  // named import

export const scheduleReminder = async (
  email: string,
  eventTitle: string,
  eventDate: Date,
  reminderTime: Date
) => {
  const delay = reminderTime.getTime() - Date.now()

  if (delay <= 0) return

  await reminderQueue.add(
    "send-reminder",  // job name — required by BullMQ
    {
      email,
      eventTitle,
      eventDate,
    },
    {
      delay,
      attempts: 2,
      backoff: { type: "fixed", delay: 5000 },
    }
  )
}