import Income from "@/models/income";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Deletes an income record by ID
 * @param _req - The incoming request (unused)
 * @param props - Route parameters
 */
export async function DELETE(
  _req: Request | NextRequest,
  props: { params: { id: string } }
) {
  try {
    const { id } = props.params;

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
