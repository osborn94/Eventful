import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import expressLayouts from "express-ejs-layouts"
import swaggerUi from "swagger-ui-express"
import { swaggerSpec } from "./config/swagger.js"
import { errorHandler } from "./middlewares/error.middleware.js"
import { verifyToken } from "./utils/jwt.js"
import methodOverride from "method-override"
// import rateLimiter from "./middlewares/rateLimit.js"
import { rateLimitMiddleware } from "./middlewares/rateLimitMiddleware.js"
import "./jobs/index.js"


import testRoutes from "./routes/test.routes.js"
import authRoutes from "./routes/auth.routes.js"
import dashboardRoutes from "./routes/dashboard.routes.js"
import eventRoutes from "./routes/event.routes.js"

import ticketRoutes from "./routes/ticket.routes.js"
import paymentRoutes from "./routes/payment.routes.js"
import scanRoutes from "./routes/scan.routes.js"
import reminderRoutes from "./routes/reminder.routes.js"
import analyticsRoutes from "./routes/analytics.routes.js"

import User from "./models/user.model.js"
import homeRoutes from "./routes/home.routes.js"
import "./jobs/reminder.worker.js"

import authApiRoutes from "./routes/api/auth.api.routes.js"
import eventApiRoutes from "./routes/api/event.api.routes.js"
import dashboardApiRoutes from "./routes/api/dashboard.api.routes.js"
import analyticsApiRoutes from "./routes/api/analytics.api.routes.js"
import homeApiRoutes from "./routes/api/home.api.routes.js"
import ticketApiRoutes from "./routes/api/ticket.api.routes.js"


// works for test
/* const _dirname = typeof __dirname !== "undefined" ? __dirname : path.resolve(); */

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()


// BASIC MIDDLEWARES
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
// app.use(rateLimiter)
app.use(rateLimitMiddleware)

app.use(methodOverride("_method"))



// VIEW SETUP
app.use(expressLayouts)

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.set("layout", "layout")


app.use(async (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    res.locals.user = null
    return next()
  }

  try {
    const decoded = verifyToken(token)

    const user = await User.findById(decoded.id)
    res.locals.user = user || null

  } catch (err) {
    res.locals.user = null
  }

  next()
})

// SSR ROUTES
app.use("/", homeRoutes)
app.use("/api", testRoutes)
app.use(authRoutes)
app.use("/dashboard", dashboardRoutes)
app.use(eventRoutes)
app.use(ticketRoutes)
app.use(paymentRoutes)
app.use(scanRoutes)
app.use(reminderRoutes)
app.use(analyticsRoutes)


// Api Routes
app.use("/api/v1/auth", authApiRoutes)
app.use("/api/v1/events", eventApiRoutes)
app.use("/api/v1/dashboard", dashboardApiRoutes)
app.use("/api/v1/analytics", analyticsApiRoutes)
app.use("/api/v1/home", homeApiRoutes)
app.use("/api/v1/tickets", ticketApiRoutes)



app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))



app.use(errorHandler)

export default app
