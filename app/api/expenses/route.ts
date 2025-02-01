import dbConnect from "@/lib/connectToDb";
import Expense from "@/models/expense";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET handler to retrieve expense records with optional date filtering and sorting
 * @param req - Next.js request object
 * @returns NextResponse containing filtered and sorted array of expense records
 */
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // Get date filters and userId from URL search params
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    // Validate userId is provided
    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    // Build query object with userId
    const query: {
      userId: string;
      date?: {
        $gte?: Date;
        $lte?: Date;
      };
    } = { userId: userId || "" };

    try {
      const expenses = await Expense.find(query).sort({ date: -1 });
      return NextResponse.json(expenses);
    } catch (error) {
      console.error("Database query error:", error);
      return NextResponse.json([], { status: 500 });
    }
  } catch (error) {
    console.error("Failed to fetch expense records:", error);
    return NextResponse.json(
      { error: "Failed to fetch expense records" },
      { status: 500 }
    );
  }
}

/**
 * POST handler to create a new expense record
 * @param req - Next.js request object containing expense data
 * @returns NextResponse containing the created expense record
 */
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { name, amount, date, category, userId } = await req.json();

    // Validate required fields
    if (!name || !amount || !date || !category || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate amount is a number
    if (Number(amount) <= 0) {
      return NextResponse.json(
        { error: "Amount must be a positive number" },
        { status: 400 }
      );
    }

    const expense = new Expense({
      name,
      category,
      amount: Number(amount),
      date,
      userId,
    });

    await expense.save();

    return NextResponse.json({ expense }, { status: 201 });
  } catch (error) {
    console.error("Failed to create expense record:", error);
    return NextResponse.json(
      { error: "Failed to create expense record" },
      { status: 500 }
    );
  }
}
