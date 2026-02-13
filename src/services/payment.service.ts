import axios from "axios"
import Payment from "../models/payment.model.js"
import Event from "../models/event.model.js"

const PAYSTACK_BASE_URL = "https://api.paystack.co"

export const initializePaymentService = async (
  userId: string,
  eventId: string,
  email: string
) => {
  const event = await Event.findById(eventId)
  if (!event) throw new Error("Event not found")

  if (event.price === 0)
    throw new Error("This is a free event")

  const reference = `EVT-${Date.now()}`

  const response = await axios.post(
    `${PAYSTACK_BASE_URL}/transaction/initialize`,
    {
      email,
      amount: event.price * 100,
      reference,
      callback_url: process.env.PAYSTACK_CALLBACK_URL
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json"
      }
    }
  )

  await Payment.create({
    user: userId,
    event: eventId,
    amount: event.price,
    reference,
    status: "pending"
  })

  return response.data.data.authorization_url
}

export const verifyPaymentService = async (reference: string) => {
  const response = await axios.get(
    `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
      }
    }
  )

  return response.data.data
}
