import dbConnect from "@/lib/connectToDb";
import TodoCategory from "@/models/todoCategory";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await dbConnect();

  const { searchParams } = request.nextUrl;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const todoCategories = await TodoCategory.find({ user: id });

  return NextResponse.json(todoCategories);
}
