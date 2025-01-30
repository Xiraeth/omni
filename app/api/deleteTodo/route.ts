import dbConnect from "@/lib/connectToDb";
import Todo from "@/models/todo";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  await dbConnect();
  const { todoId, userId } = await req.json();

  if (!todoId) {
    return NextResponse.json({ message: "Todo ID is required" });
  }

  if (!userId) {
    return NextResponse.json({ message: "User ID is required" });
  }

  const todo = await Todo.findByIdAndDelete(todoId);

  return NextResponse.json({ message: "Todo deleted successfully", todo });
}
