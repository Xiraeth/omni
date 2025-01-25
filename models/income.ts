import mongoose, { Schema } from "mongoose";

interface Income {
  _id: string;
  name: string;
  amount: number;
  date: Date;
  category: string;
  userId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const incomeSchema = new Schema<Income>({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Income =
  mongoose.models.Income || mongoose.model<Income>("Income", incomeSchema);

export default Income;
