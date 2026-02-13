import type { Response } from "express"
import type { AuthRequest } from "../middlewares/auth.middleware.js"
import {
  initializePaymentService,
  verifyPaymentService
} from "../services/payment.service.js"
import Payment from "../models/payment.model.js"
import { createTicketService } from "../services/ticket.service.js"

interface TicketParams {
    eventId: string
}

export const initializePayment = async (
  req: AuthRequest<TicketParams>,
  res: Response
) => {
  const { eventId } = req.params

  const url = await initializePaymentService(
    req.user.id,
    eventId,
    req.user.email
  )

  res.redirect(url)
}

export const verifyPayment = async (
  req: AuthRequest,
  res: Response
) => {
  const { reference } = req.query

  if (!reference) return res.send("Invalid reference")

  const paymentData = await verifyPaymentService(reference as string)

  if (paymentData.status !== "success")
    return res.send("Payment failed")

  const payment = await Payment.findOne({ reference })

  if (!payment) return res.send("Payment record not found")

  payment.status = "success"
  await payment.save()

  const ticket = await createTicketService(
    payment.event.toString(),
    payment.user.toString(),
    "paid"
  )

  res.redirect(`/tickets/${ticket._id}`)
}
