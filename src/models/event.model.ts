import mongoose, { Schema, Document } from "mongoose"

export interface IEvent extends Document {
  title: string
  description: string
  location: string
  date: Date
  price: number
  creator: mongoose.Types.ObjectId
  slug: string
  image?: string
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    price: { type: Number, default: 0 },
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    slug: { type: String, unique: true, index: true },
    image: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
)

export default mongoose.model<IEvent>("Event", EventSchema)
