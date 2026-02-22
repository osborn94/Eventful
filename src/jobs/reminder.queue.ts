import { Queue } from "bullmq"
import { bullQueueConnection } from "../config/redis.js"

export const reminderQueue = new Queue("event-reminders", {
  connection: bullQueueConnection,
})


// import Bull from "bull"

// const reminderQueue = new Bull("reminderQueue", {
//   redis: {
//     host: "127.0.0.1",
//     port: 6379
//   }
// })

// export default reminderQueue

