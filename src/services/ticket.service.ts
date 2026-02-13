import Ticket from "../models/ticket.model.js"
import { generateQRCode } from "../utils/qrcode.js"

export const createTicketService = async (
  eventId: string,
  userId: string,
  paymentStatus: "free" | "paid"
) => {
  const existing = await Ticket.findOne({ event: eventId, user: userId })
  if (existing) return existing

  const ticket = await Ticket.create({
    event: eventId,
    user: userId,
    paymentStatus
  })

  const qrData = `TICKET:${ticket._id}`

  const qrCode = await generateQRCode(qrData)

  ticket.qrCode = qrCode
  await ticket.save()

  return ticket
}
