import { Redis } from "ioredis"

const createRedisClient = () => {
  if (process.env.REDIS_URL) {
    return new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: null,
      enableOfflineQueue: false,
    })
  }
  
  return new Redis({
    host: '::1',
    port: 6379,
    maxRetriesPerRequest: null,
    enableOfflineQueue: false,
  })
}

// General purpose — used by rate limiter, sessions, etc.
export const redisClient = createRedisClient()

// Dedicated connection for BullMQ Queue
export const bullQueueConnection = createRedisClient()

// Dedicated connection for BullMQ Worker
export const bullWorkerConnection = createRedisClient()

redisClient.on("connect", () => console.log("✅ Redis connected"))
redisClient.on("error", (err: Error) => console.error("❌ Redis error:", err))

