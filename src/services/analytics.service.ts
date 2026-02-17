import Ticket from "../models/ticket.model.js"
import Payment from "../models/payment.model.js"
import Event from "../models/event.model.js"

export const getCreatorAnalytics = async (creatorId: string) => {

  // Get creator events
  const events = await Event.find({ creator: creatorId })

  const eventIds = events.map(e => e._id)

  // Get tickets only for creator's events
  const tickets = await Ticket.find({
    event: { $in: eventIds }
  })

  const totalTickets = tickets.length

  const totalScanned = tickets.filter(t => t.scanned).length
  const totalUnscanned = totalTickets - totalScanned

  const uniqueAttendees = new Set(
    tickets.map(t => t.user.toString())
  ).size

  // Revenue (only successful payments for creator events)
  const revenue = await Payment.aggregate([
    {
      $match: {
        event: { $in: eventIds },
        status: "success"
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" }
      }
    }
  ])

  const totalRevenue = revenue[0]?.total || 0

  // Per-event breakdown
  const eventBreakdown = events.map(event => {

    const eventTickets = tickets.filter(
      t => t.event.toString() === event._id.toString()
    )

    const scanned = eventTickets.filter(t => t.scanned).length

    return {
      event,
      totalTickets: eventTickets.length,
      scanned,
      unscanned: eventTickets.length - scanned,
      uniqueBuyers: new Set(
        eventTickets.map(t => t.user.toString())
      ).size
    }
  })

  return {
    totalTickets,
    totalScanned,
    totalUnscanned,
    totalRevenue,
    uniqueAttendees,
    eventBreakdown
  }
}








// export const getCreatorAnalytics = async (creatorId: string) => {
//   const totalTickets = await Ticket.countDocuments()

//   const totalScanned = await Ticket.countDocuments({
//     scanned: true
//   })

//   const totalRevenue = await Payment.aggregate([
//     { $match: { status: "success" } },
//     {
//       $group: {
//         _id: null,
//         total: { $sum: "$amount" }
//       }
//     }
//   ])

//   return {
//     totalTickets,
//     totalScanned,
//     totalRevenue: totalRevenue[0]?.total || 0
//   }
// }
