import mongoose, { Schema, Document } from "mongoose"

export interface ITicket extends Document {
  event: mongoose.Types.ObjectId
  user: mongoose.Types.ObjectId
  qrCode: string
  scanned: boolean
  amount: number
  paymentStatus: "free" | "paid"
}

const TicketSchema = new Schema<ITicket>(
  {
    event: { type: Schema.Types.ObjectId, ref: "Event" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    qrCode: { type: String },
    scanned: { type: Boolean, default: false },
    amount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["free", "paid"],
      default: "free"
    }
  },
  { timestamps: true }
)

TicketSchema.pre("validate", async function () {
  if (this.isNew && !this.amount) {
    const event = await mongoose.model("Event").findById(this.event)

    if (!event) {
      throw new Error("Event not found")
    }

    this.amount = event.price
    this.paymentStatus = event.price > 0 ? "paid" : "free"
  }
})

export default mongoose.model<ITicket>("Ticket", TicketSchema)