import { IncomeDataType } from "@/app/types/income";
import { SortFieldType, SortOrderType } from "@/app/types/income";

export const handleSort = (
  data: IncomeDataType[],
  field: SortFieldType,
  order: SortOrderType
) => {
  return data.sort((a, b) => {
    if (field === "Category") {
      return order === "asc"
        ? a.category.localeCompare(b.category)
        : b.category.localeCompare(a.category);
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
