import type { Request, Response } from "express"
import User from "../../models/user.model.js"
import { hashPassword, comparePassword } from "../../utils/hash.js"
import { signToken } from "../../utils/jwt.js"

export const registerApi = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      })
    }

    const hashedPassword = await hashPassword(password)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    })

    const token = signToken({
      id: user._id,
      role: user.role,
      email: user.email
    })

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    })

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error during registration"
    })
  }
}

export const loginApi = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist"
      })
    }

    const isMatch = await comparePassword(password, user.password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      })
    }

    const token = signToken({
      id: user._id,
      role: user.role,
      email: user.email
    })

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    })

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error during login"
    })
  }
}

export const logoutApi = (req: Request, res: Response) => {
  res.clearCookie("token")

  return res.status(200).json({
    success: true,
    message: "Logged out successfully"
  })
}
