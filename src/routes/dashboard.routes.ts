import { Router } from "express"
import { protect } from "../middlewares/auth.middleware.js"
import { dashboard } from "../controllers/dashboard.controller.js"

const router = Router()

router.get("/creator", protect, dashboard)
router.get("/eventee", protect, dashboard)

// router.get("/dashboard", protect, (req, res) => {
//   res.render("dashboard", { title: "Dashboard" })
// })

// router.get("/eventee", protect, (req, res) => {
//   res.render("eventee", { title: "Eventee Dashboard" })
// })

export default router


