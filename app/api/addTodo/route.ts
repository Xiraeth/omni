import Todo from "@/models/todo";
import dbConnect from "@/lib/connectToDb";
import { NextRequest, NextResponse } from "next/server";
import TodoCategory from "@/models/todoCategory";

export async function POST(req: NextRequest) {
  await dbConnect();
  const {
    _id,
    title,
    description,
    dateFor,
    timeFor,
    priority,
    category,
    userId,
  } = await req.json();

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

  const todoData = {
    title,
    description,
    dateFor,
    timeFor,
    completed: false,
    priority: priority.toLowerCase(),
    category: categoryId,
    user: userId,
  };

  let todo;
  if (_id) {
    // Update existing todo and populate category
    todo = await Todo.findByIdAndUpdate(
      _id,
      todoData,
      { new: true } // Returns the updated document
    ).populate("category");

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }
  } else {
    // Create new todo and populate category
    todo = await Todo.create(todoData);
    todo = await todo.populate("category");
  }

  return NextResponse.json({ todo });
}
