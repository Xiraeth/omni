import { ExpensesDataType } from "@/app/expenses/types";
import { IncomeDataType } from "@/app/income/types";
import { getDateInfo } from "./getTemporalInfo";

// Define a type for chart data entries
type ChartDataEntry = {
  month: string;
  incomes: number;
  expenses: number;
};

export const constructChartData = (
  incomeEntries: IncomeDataType[],
  expenseEntries: ExpensesDataType[]
): ChartDataEntry[] => {
  // Initialize chart data with months
  const chartData: ChartDataEntry[] = Array.from(
    { length: 12 },
    (_, index) => ({
      month: new Date(0, index).toLocaleString("default", { month: "short" }),
      incomes: 0,
      expenses: 0,
    })
  );

  // Create a map for month indices for quick access
  const monthIndexMap: { [key: string]: number } = Object.fromEntries(
    chartData.map((entry, index) => [entry.month, index])
  );

  // Process income entries
  incomeEntries.forEach((income) => {
    const incomeDate = new Date(income.date);
    const { monthShort } = getDateInfo(incomeDate);
    const monthIndex = monthIndexMap[monthShort];

    if (monthIndex !== undefined) {
      chartData[monthIndex].incomes += income.amount;
    }
  });

  // Process expense entries
  expenseEntries.forEach((expense) => {
    const expenseDate = new Date(expense.date);
    const { monthShort } = getDateInfo(expenseDate);
    const monthIndex = monthIndexMap[monthShort];

    if (monthIndex !== undefined) {
      chartData[monthIndex].expenses += expense.amount;
    }
  });

  return chartData;
};
