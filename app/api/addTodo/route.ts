import Todo from "@/models/todo";
import dbConnect from "@/lib/connectToDb";
import { NextRequest, NextResponse } from "next/server";
import TodoCategory from "@/models/todoCategory";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { title, description, dateFor, timeFor, priority, category, userId } =
    await req.json();

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  if (!dateFor) {
    return NextResponse.json({ error: "Date is required" }, { status: 400 });
  }

  if (!priority) {
    return NextResponse.json(
      { error: "Priority is required" },
      { status: 400 }
    );
  }

  if (!category) {
    return NextResponse.json(
      { error: "Category is required" },
      { status: 400 }
    );
  }

  const categoryId = await TodoCategory.findOne({ name: category });

  if (!categoryId) {
    return NextResponse.json({ error: "Category not found" }, { status: 400 });
  }

  const todo = await Todo.create({
    title,
    description,
    dateFor,
    timeFor,
    completed: false,
    priority: priority.toLowerCase(),
    category: categoryId,
    user: userId,
  });

  return NextResponse.json({ todo });
}
