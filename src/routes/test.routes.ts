import express from "express"
import { scheduleReminder } from "../services/reminder.service.js"
import { reminderQueue } from "../jobs/reminder.queue.js"

const router = express.Router()

router.get("/test-reminder", async (req, res) => {
  try {
    const fakeEventDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now
    const fakeReminderTime = new Date(Date.now() + 10 * 1000)   // 10 seconds from now

    await scheduleReminder(
      "dillyteq@gmail.com",   // use your real email here
      "Test Event",
      fakeEventDate,
      fakeReminderTime
    )

    const jobs = await reminderQueue.getJobs(["delayed"])
    console.log("Delayed jobs in queue:", jobs.length)

    res.send("✅ Reminder job queued. Check your worker logs in 10 seconds.")
  } catch (err) {
    console.error(err)
    res.status(500).send("❌ Failed to queue reminder")
  }
})

export default router




// import { Router } from "express"
// const router = Router()

// router.get("/ping", (req, res) => {
//   res.json({ message: "Eventful API is alive" })
// })

// export default router
