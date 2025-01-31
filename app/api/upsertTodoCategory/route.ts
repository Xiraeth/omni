import dbConnect from "@/lib/connectToDb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import TodoCategory from "@/models/todoCategory";

export async function POST(req: NextRequest) {
  await dbConnect();

  const { name, description, userId } = await req.json();

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const user = await User.findById(userId);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const todoCategory = new TodoCategory({
    name,
    description,
    user: user._id,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await todoCategory.save();

  return NextResponse.json({
    message: "Category created",
    category: todoCategory,
  });
}

export async function PUT(req: NextRequest) {
  await dbConnect();

  const { name, description, userId, categoryId } = await req.json();

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  if (!categoryId) {
    return NextResponse.json(
      { error: "Category ID is required" },
      { status: 400 }
    );
  }

  const user = await User.findById(userId);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const todoCategory = await TodoCategory.findById(categoryId);

  if (!todoCategory) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  todoCategory.name = name;
  todoCategory.description = description;

  await todoCategory.save();

  return NextResponse.json({
    message: "Category updated",
    category: todoCategory,
  });
}
