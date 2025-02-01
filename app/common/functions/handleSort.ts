import { ExpensesDataType } from "@/app/expenses/types";
import { IncomeDataType, SortOrderType } from "../../income/types";
import { SortFieldType } from "../../income/types";

export const handleSortIncomes = (
  data: IncomeDataType[],
  field: SortFieldType,
  order: SortOrderType
) => {
  return data.sort((a, b) => {
    if (field === "Category") {
      return order === "asc"
        ? (a.category || "").localeCompare(b.category || "")
        : (b.category || "").localeCompare(a.category || "");
    } else if (field === "Amount") {
      return order === "asc" ? a.amount - b.amount : b.amount - a.amount;
    } else if (field === "Date") {
      return order === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (field === "Name") {
      return order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    return 0;
  });
};

export const handleSortExpenses = (
  data: ExpensesDataType[],
  field: SortFieldType,
  order: SortOrderType
) => {
  return data.sort((a, b) => {
    if (field === "Category") {
      return order === "asc"
        ? (a.category || "").localeCompare(b.category || "")
        : (b.category || "").localeCompare(a.category || "");
    } else if (field === "Amount") {
      return order === "asc" ? a.amount - b.amount : b.amount - a.amount;
    } else if (field === "Date") {
      return order === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (field === "Name") {
      return order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    return 0;
  });
};
