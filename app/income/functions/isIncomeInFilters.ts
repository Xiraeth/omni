import { CategoriesType, FiltersType } from "@/app/types/income";

import { IncomeDataType } from "@/app/types/income";

export const isIncomeInFilters = (
  income: IncomeDataType,
  filters: FiltersType
) => {
  const date = new Date(income?.date);

  const isIncomeAfterDateFrom = filters?.dateFrom
    ? date > new Date(filters?.dateFrom)
    : true;

  const isIncomeBeforeDateTo = filters?.dateTo
    ? date < new Date(filters?.dateTo)
    : true;

  const isInCategory = filters?.toggledCategories?.includes(
    income?.category?.toLowerCase() as CategoriesType
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
