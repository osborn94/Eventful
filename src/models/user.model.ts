import mongoose, { Schema, Document } from "mongoose"

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: "creator" | "eventee"
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["creator", "eventee"],
      default: "eventee"
    }
  },
  { timestamps: true }
)

export default mongoose.model<IUser>("User", UserSchema)
