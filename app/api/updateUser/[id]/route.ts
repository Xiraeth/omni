import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/connectToDb";
import User from "@/models/user";
import bcrypt from "bcrypt";

export async function PUT(req: NextRequest) {
  await dbConnect();

  const { username, email, password, id, oldPassword } = await req.json();

  let user = await User.findById(id);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Verify 'old password' entered matches the user's password
  let isPasswordValid: boolean | undefined;

  if (oldPassword) {
    isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  }

  if (oldPassword && !isPasswordValid) {
    return NextResponse.json(
      { error: "Old password is incorrect" },
      { status: 400 }
    );
  }

  if (username) {
    user.username = username;
  }

  if (email) {
    user.email = email;
  }

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
  }

  await user.save();

  return NextResponse.json(
    { message: "User updated successfully", user },
    { status: 200 }
  );
}
