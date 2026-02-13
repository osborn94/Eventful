import mongoose, { Schema, Document } from "mongoose"

export interface IReminder extends Document {
  user: mongoose.Types.ObjectId
  event: mongoose.Types.ObjectId
  reminderTime: Date
}

const ReminderSchema = new Schema<IReminder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    event: { type: Schema.Types.ObjectId, ref: "Event" },
    reminderTime: { type: Date, required: true }
  },
  { timestamps: true }
)

export default mongoose.model<IReminder>(
  "Reminder",
  ReminderSchema
)
