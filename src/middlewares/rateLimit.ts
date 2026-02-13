import rateLimit from "express-rate-limit"

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  handler: (req, res) => {
    res.status(429).render("login",{
        error: "Too many login attempts. Please try again later."
    })
  }
})
