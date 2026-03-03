import mongoose from "mongoose";

const userschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },

    avatar: {
      type: String,
    },
    credits: {
      type: Number,
      default: 100,
      min: 0,
    },
    plan: {
      type: String,
      enum: ["free", "pro", "enterprise"],
      default: "free",
    },
  },
  { timestamps: true },
);
const User = mongoose.model("User", userschema);
export default User;
