import mongoose, { Schema } from "mongoose";
import { TodoCategoryType } from "@/app/todos/lib/types";

const todoCategorySchema = new Schema<TodoCategoryType>({
  name: { type: String, required: true },
  description: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

todoCategorySchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const TodoCategory =
  mongoose.models.TodoCategory ||
  mongoose.model<TodoCategoryType>("TodoCategory", todoCategorySchema);

export default TodoCategory;
