import mongoose, { Schema } from "mongoose";
import { TodoType } from "@/app/todos/types";

const todoSchema = new Schema<TodoType>({
  title: { type: String, required: true, minlength: 1, maxlength: 50 },
  description: { type: String, required: true, minlength: 1, maxlength: 255 },
  completed: { type: Boolean, required: true },
  dateFor: { type: Date, required: true },
  category: { type: Schema.Types.ObjectId, ref: "TodoCategory" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

todoSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Todo =
  mongoose.models.Todo || mongoose.model<TodoType>("Todo", todoSchema);

export default Todo;
