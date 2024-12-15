import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/connectToDb";
import User from "@/models/user";

export async function POST(req: NextRequest) {
  await dbConnect();

  const { email, password, username } = await req.json();

  if (!email || !password || !username) {
    return NextResponse.json(
      { error: "Email, password and username are required" },
      { status: 400 }
    );
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, username });

    await user.save();

    return NextResponse.json(
      { message: "User registered successfully", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
