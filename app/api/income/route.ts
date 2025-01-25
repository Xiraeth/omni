import dbConnect from "@/lib/connectToDb";
import Income from "@/models/income";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET handler to retrieve income records with optional date filtering
 * @param req - Next.js request object
 * @returns NextResponse containing filtered array of income records
 */
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // Get date filters from URL search params
    const searchParams = req.nextUrl.searchParams;
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");

    // Build query object
    const query: { date?: { $gte?: Date; $lte?: Date } } = {};

    if (dateFrom || dateTo) {
      query.date = {};
      if (dateFrom) {
        query.date.$gte = new Date(dateFrom);
      }
      if (dateTo) {
        query.date.$lte = new Date(dateTo);
      }
    }

    const allIncomesList = await Income.find(query);

    return NextResponse.json(allIncomesList);
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
