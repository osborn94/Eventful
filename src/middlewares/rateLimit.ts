// import { RedisStore } from "rate-limit-redis"
import { RateLimiterRedis } from "rate-limiter-flexible"
import { redisClient } from "../config/redis.js"

export const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "middleware",
  points: 100,       // requests
  duration: 15 * 60, // per 15 minutes
})

