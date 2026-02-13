import Bull from "bull"

const reminderQueue = new Bull("reminderQueue", {
  redis: {
    host: "127.0.0.1",
    port: 6379
  }
})

export default reminderQueue


// import Bull from "bull"
// import redis from "../config/redis.js"

// const reminderQueue = new Bull("reminderQueue", {
//     createClient: () => redis

// })

// export default reminderQueue
