import dbConnect from "@/lib/connectToDb";
import Income from "@/models/income";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET handler to retrieve income records with optional date filtering and sorting
 * @param req - Next.js request object
 * @returns NextResponse containing filtered and sorted array of income records
 */
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // Get date filters and userId from URL search params
    const searchParams = req.nextUrl.searchParams;
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");
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

    // Add date filters with validation
    if (dateFrom || dateTo) {
      query.date = {};

      if (dateFrom) {
        const fromDate = new Date(dateFrom);
        if (isNaN(fromDate.getTime())) {
          return NextResponse.json(
            { error: "Invalid dateFrom format. Use YYYY-MM-DD" },
            { status: 400 }
          );
        }
        query.date.$gte = fromDate;
      }

      if (dateTo) {
        const toDate = new Date(dateTo);
        if (isNaN(toDate.getTime())) {
          return NextResponse.json(
            { error: "Invalid dateTo format. Use YYYY-MM-DD" },
            { status: 400 }
          );
        }
        query.date.$lte = toDate;
      }
    }

    try {
      const incomes = await Income.find(query).sort({ date: -1 });
      return NextResponse.json(incomes);
    } catch (error) {
      console.error("Database query error:", error);
      return NextResponse.json([], { status: 500 });
    }
  } catch (error) {
    console.error("Failed to fetch income records:", error);
    return NextResponse.json(
      { error: "Failed to fetch income records" },
      { status: 500 }
    );
  }
}

/**
 * POST handler to create a new income record
 * @param req - Next.js request object containing income data
 * @returns NextResponse containing the created income record
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

    const income = new Income({
      name,
      category,
      amount: Number(amount),
      date,
      userId,
    });

    await income.save();

    return NextResponse.json({ income }, { status: 201 });
  } catch (error) {
    console.error("Failed to create income record:", error);
    return NextResponse.json(
      { error: "Failed to create income record" },
      { status: 500 }
    );
  }
}
