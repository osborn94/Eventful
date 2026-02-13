import { Router } from "express"
import { protect } from "../middlewares/auth.middleware.js"
import { authorize } from "../middlewares/role.middleware.js"
import { scanTicket } from "../controllers/scan.controller.js"
import { authLimiter } from "../middlewares/rateLimit.js"

const router = Router()

router.get(
  "/scanner",
  protect,
  authorize("creator"),
  (req, res) => {
    res.render("scanner", { title: "Ticket Scanner" })
  }
)
// router.get(
//   "/creator/scan",
//   protect,
//   authorize("creator"),
//   (req, res) => {
//     res.render("scanner")
//   }
// )

router.post(
  "/creator/scan",
  authLimiter,
  protect,
  authorize("creator"),
  scanTicket
)

export default router