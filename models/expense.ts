import mongoose, { Schema } from "mongoose";

type ExpenseType = {
  name: string;
  amount: number;
  date: Date;
  category: string;
  userId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

const expenseSchema = new Schema<ExpenseType>({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Expense =
  mongoose.models.Expense ||
  mongoose.model<ExpenseType>("Expense", expenseSchema);

export default Expense;
