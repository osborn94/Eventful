import mongoose, { Schema, Document } from "mongoose"

export interface ITicket extends Document {
  event: mongoose.Types.ObjectId
  user: mongoose.Types.ObjectId
  qrCode: string
  scanned: boolean
  paymentStatus: "free" | "paid"
}

const TicketSchema = new Schema<ITicket>(
  {
    event: { type: Schema.Types.ObjectId, ref: "Event" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    qrCode: { type: String },
    scanned: { type: Boolean, default: false },
    paymentStatus: {
      type: String,
      enum: ["free", "paid"],
      default: "free"
    }
  },
  { timestamps: true }
)

export default mongoose.model<ITicket>("Ticket", TicketSchema)