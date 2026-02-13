import { Router } from "express"
const router = Router()

router.get("/ping", (req, res) => {
  res.json({ message: "Eventful API is alive" })
})

export default router
