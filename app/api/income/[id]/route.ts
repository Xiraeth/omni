import Income from "@/models/income";
import { NextRequest, NextResponse } from "next/server";

/**
 * Deletes an income record by ID
 * @param req - The incoming request
 */
export async function DELETE(req: NextRequest) {
  try {
    // Extract the ID from the URL
    const { searchParams } = req.nextUrl;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const deletedIncome = await Income.findByIdAndDelete(id);

    if (!deletedIncome) {
      return NextResponse.json(
        { message: "Income not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Income deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting income" },
      { status: 500 }
    );
  }
}
