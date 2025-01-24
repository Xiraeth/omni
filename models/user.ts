import mongoose, { Schema } from "mongoose";

interface User {
  email: string;
  password: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const User = mongoose.models.User || mongoose.model<User>("User", userSchema);

export default User;
