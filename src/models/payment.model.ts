import mongoose, { Schema, Document } from "mongoose"

export interface IPayment extends Document {
  user: mongoose.Types.ObjectId
  event: mongoose.Types.ObjectId
  amount: number
  reference: string
  status: "pending" | "success" | "failed"
}

const PaymentSchema = new Schema<IPayment>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    event: { type: Schema.Types.ObjectId, ref: "Event" },
    amount: { type: Number, required: true },
    reference: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending"
    }
  },
  { timestamps: true }
)

export default mongoose.model<IPayment>("Payment", PaymentSchema)
