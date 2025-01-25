import { IncomeFormErrorsType } from "@/app/types/income";

import { IncomeFormDataType } from "@/app/types/income";

export const verifyData = (data: IncomeFormDataType) => {
  let errors: IncomeFormErrorsType[] = [];

  if (data.name?.length === 0) {
    errors.push({ field: "name", message: "Name is required" });
  }
  if (!data?.amount) {
    errors.push({ field: "amount", message: "Amount is required" });
  }
  if (data.date?.length === 0) {
    errors.push({ field: "date", message: "Date is required" });
  }
  if (data.category?.length === 0) {
    errors.push({ field: "category", message: "Category is required" });
  }
  if (data.userId?.length === 0) {
    errors.push({ field: "userId", message: "User ID is required" });
  }

  return errors;
};
