import mongoose, { Schema } from "mongoose";
import { TodoType } from "@/app/todos/types";

const todoSchema = new Schema<TodoType>({
  title: { type: String, required: true, minlength: 1, maxlength: 50 },
  description: { type: String, required: false, minlength: 1, maxlength: 255 },
  completed: { type: Boolean, required: true },
  priority: {
    type: String,
    required: true,
    enum: ["low", "medium", "high"],
  },
  dateFor: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  category: { type: Schema.Types.ObjectId, ref: "TodoCategory" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

todoSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Todo =
  mongoose.models.Todo || mongoose.model<TodoType>("Todo", todoSchema);

export default Todo;
