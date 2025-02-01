import Expense from "@/models/expense";
import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

/**
 * Deletes an expense record by ID
 * @param request - The incoming request
 * @param props - Route parameters containing the expense ID as a Promise
 */
export async function DELETE(request: NextRequest, props: Props) {
  try {
    const params = await props.params;
    const { id } = params;

    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return NextResponse.json(
        { message: "Expense not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { response: deletedExpense, message: "Expense deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting expense" },
      { status: 500 }
    );
  }
}
