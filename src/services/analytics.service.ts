import Ticket from "../models/ticket.model.js"
import Payment from "../models/payment.model.js"

export const getCreatorAnalytics = async (creatorId: string) => {
  const totalTickets = await Ticket.countDocuments()

  const totalScanned = await Ticket.countDocuments({
    scanned: true
  })

  const totalRevenue = await Payment.aggregate([
    { $match: { status: "success" } },
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" }
      }
    }
  ])

  return {
    totalTickets,
    totalScanned,
    totalRevenue: totalRevenue[0]?.total || 0
  }
}
