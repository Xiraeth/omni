import Income from "@/models/income";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Deletes an income record by ID
 * @param req - The incoming request
 * @param { params }: { params: { id: string } } - Contains route parameters including the income ID
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

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
