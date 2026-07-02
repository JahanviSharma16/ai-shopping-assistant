import mongoose from "mongoose";
import { hashPassword } from "../utils/password.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
      trim: true,
    },
    avatar: {
      type: String,
      trim: true,
      default: null,
    },
    role: {
      type: String,
      trim: true,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
      default: null,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function hashUserPassword() {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await hashPassword(this.password);
});

const User = mongoose.model("User", userSchema);

export default User;
