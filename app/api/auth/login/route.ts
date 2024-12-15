import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/connectToDb";

export async function POST(req: NextRequest) {
  await dbConnect();

  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" });
    }

    return NextResponse.json({
      message: "Login successful",
      user: user.email,
      userId: user._id,
    });
  } catch (error) {
    return NextResponse.json({ error: "Server error" });
  }
}
