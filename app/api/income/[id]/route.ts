import Income from "@/models/income";
import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

/**
 * Deletes an income record by ID
 * @param request - The incoming request
 * @param props - Route parameters containing the income ID as a Promise
 */
export async function DELETE(request: NextRequest, props: Props) {
  try {
    const params = await props.params;
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
