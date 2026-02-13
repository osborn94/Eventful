import reminderQueue from "../jobs/reminder.queue.js"

export const scheduleReminder = async (
  email: string,
  eventTitle: string,
  eventDate: Date,
  reminderTime: Date
) => {
  const delay = reminderTime.getTime() - Date.now()

  if (delay <= 0) return

  await reminderQueue.add(
    {
      email,
      eventTitle,
      eventDate
    },
    {
      delay,
      attempts: 3,
      backoff: 5000
    }
  )
}
