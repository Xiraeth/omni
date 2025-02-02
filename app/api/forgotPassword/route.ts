import dbConnect from "@/lib/connectToDb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const html = `
    <p>Hi, ${user.username},</p>
    <p>Here's your password recovery link</p>
    <a href="${process.env.APP_URL}/reset-password/${user._id}">Reset password here</a>
    <p>Best regards, Omni</p>
  `;

  const transporter = nodemailer.createTransport({
    service: "Yahoo",
    auth: {
      user: process.env.YAHOO_ACCOUNT_USER,
      pass: process.env.YAHOO_ACCOUNT_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.YAHOO_ACCOUNT_USER,
      to: email,
      subject: "Password Recovery",
      html,
    });

    return NextResponse.json({ message: "Email sent" }, { status: 200 });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Failed to send recovery email" },
      { status: 500 }
    );
  }
}
