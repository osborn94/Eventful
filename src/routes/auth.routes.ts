import { Router } from "express"
import { login, register, logout } from "../controllers/auth.controller.js"
import { authLimiter } from "../middlewares/rateLimit.js"

const router = Router()

router.get("/login", (req, res) => res.render("login", {title: "Login", error: null }))
router.get("/register", (req, res) => res.render("register", { title: "Register", error: null }))

router.post("/login",authLimiter, login)
router.post("/register", register)
router.post("/logout", logout)

export default router
