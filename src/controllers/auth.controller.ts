import type { Request, Response } from "express"
import User from "../models/user.model.js"
import { hashPassword, comparePassword } from "../utils/hash.js"
import { signToken } from "../utils/jwt.js"

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.render("register", { title: "Register", error: "User already exists" })
  }

  const hashedPassword = await hashPassword(password)

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  })

  const token = signToken({ id: user._id, role: user.role, email: user.email })

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  })

  // redirect based on role
  return res.redirect(
    user.role === "creator"
      ? "/dashboard/creator"
      : "/dashboard/eventee"
  );
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) {
    return res.render("login", {title: "Login", error: "User Does Not Exist" })
  }

  const isMatch = await comparePassword(password, user.password)
  if (!isMatch) {
    return res.render("login", {title: "Login", error: "Invalid credentials" })
  }

  const token = signToken({ id: user._id, role: user.role })

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  })

    // redirect based on role
  return res.redirect(
    user.role === "creator"
      ? "/dashboard/creator"
      : "/dashboard/eventee"
  );
}

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token")
  res.redirect("/login")
}
