import dbConnect from "@/lib/connectToDb";
import Todo from "@/models/todo";
import "@/models/todoCategory";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await dbConnect();

  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 }
    );
  }

  const todos = await Todo.find({ user: id }).populate("category", "name");

  return NextResponse.json(todos);
}
