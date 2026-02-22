import { Worker } from "bullmq"
import { bullWorkerConnection } from "../config/redis.js"
import { sendReminderEmail } from "../services/email.service.js"

const worker = new Worker(
  "event-reminders",
  async (job) => {
    const { email, eventTitle, eventDate } = job.data
    console.log(`Sending reminder to ${email} for event "${eventTitle}"`)
    await sendReminderEmail(email, eventTitle, new Date(eventDate))
    console.log(`✅ Email sent to ${email}`)
  },
  { connection: bullWorkerConnection }
)

worker.on("failed", (job, err) => {
  console.error(`❌ Reminder job ${job?.id} failed:`, err.message)
})

worker.on("completed", (job) => {
  console.log(`✅ Reminder job ${job.id} completed`)
})

export default worker


// import reminderQueue from "./reminder.queue.js"
// import { sendEmail } from "../utils/email.js"

// reminderQueue.process(async (job) => {
//   const { email, eventTitle, eventDate } = job.data

//   await sendEmail(
//     email,
//     `Reminder: ${eventTitle}`,
//     `Your event "${eventTitle}" is happening on ${eventDate}.`
//   )
//    console.log("Reminder email sent to:", email)
// })
