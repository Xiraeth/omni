import {
  ExpensesCategoriesType,
  ExpensesFiltersType,
  ExpensesDataType,
} from "../types";

export const isExpenseInFilters = (
  expense: ExpensesDataType,
  filters: ExpensesFiltersType
) => {
  const date = new Date(expense?.date);

  const isExpenseAfterDateFrom = filters?.dateFrom
    ? date > new Date(filters?.dateFrom)
    : true;

  const isExpenseBeforeDateTo = filters?.dateTo
    ? date < new Date(filters?.dateTo)
    : true;

  const isInCategory = filters?.toggledCategories?.includes(
    expense?.category?.toLowerCase() as ExpensesCategoriesType
  );

  const isInName =
    (filters?.filterName?.length || 0) > 0
      ? expense?.name?.toLowerCase() === filters?.filterName?.toLowerCase()
      : true;

  const shouldExpenseBeDisplayed =
    isExpenseAfterDateFrom && isExpenseBeforeDateTo && isInCategory && isInName;

  if (!shouldExpenseBeDisplayed) return false;

  return true;
};
