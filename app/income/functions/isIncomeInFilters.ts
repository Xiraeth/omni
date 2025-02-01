import {
  IncomeCategoriesType,
  IncomeFiltersType,
  IncomeDataType,
} from "../types";

export const isIncomeInFilters = (
  income: IncomeDataType,
  filters: IncomeFiltersType
) => {
  const date = new Date(income?.date);

  const isIncomeAfterDateFrom = filters?.dateFrom
    ? date > new Date(filters?.dateFrom)
    : true;

  const isIncomeBeforeDateTo = filters?.dateTo
    ? date < new Date(filters?.dateTo)
    : true;

  const isInCategory = filters?.toggledCategories?.includes(
    income?.category?.toLowerCase() as IncomeCategoriesType
  );

  const isInName =
    (filters?.filterName?.length || 0) > 0
      ? income?.name?.toLowerCase() === filters?.filterName?.toLowerCase()
      : true;

  const shouldIncomeBeDisplayed =
    isIncomeAfterDateFrom && isIncomeBeforeDateTo && isInCategory && isInName;

  if (!shouldIncomeBeDisplayed) return false;

  return true;
};
