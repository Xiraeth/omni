import dbConnect from "@/lib/connectToDb";
import TodoCategory from "@/models/todoCategory";
import Todo from "@/models/todo";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  await dbConnect();

  const { categoryId, userId } = await request.json();

  if (!categoryId) {
    return NextResponse.json(
      { error: "Category ID is required" },
      { status: 400 }
    );
  }

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  // Check for existing todos with this category
  const existingTodos = await Todo.find({ category: categoryId });

  if (existingTodos.length > 0) {
    return NextResponse.json(
      {
        error:
          "Cannot delete category that has existing todos. Please delete or reassign todos first.",
      },
      { status: 400 }
    );
  }

  const todoCategory = await TodoCategory.findByIdAndDelete(categoryId);

  if (!todoCategory) {
    return NextResponse.json(
      { error: "Todo category not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(todoCategory);
}
