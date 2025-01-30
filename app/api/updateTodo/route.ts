import dbConnect from "@/lib/connectToDb";
import Todo from "@/models/todo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();

  const { todoId, completed, title, description, dateFor, timeFor, priority } =
    await req.json();

  if (!todoId) {
    return NextResponse.json(
      { message: "Todo ID is required" },
      { status: 400 }
    );
  }

  const isNoFieldProvided =
    completed === undefined &&
    !title &&
    !description &&
    !dateFor &&
    !timeFor &&
    !priority;

  if (isNoFieldProvided) {
    return NextResponse.json({ message: "No field provided" }, { status: 400 });
  }

  const todo = await Todo.findByIdAndUpdate(
    todoId,
    {
      completed,
      title,
      description,
      dateFor,
      timeFor,
      priority,
    },
    { new: true }
  );

  return NextResponse.json({ message: "Todo updated", todo });
}
