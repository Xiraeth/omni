export type CategoriesType = "salary" | "freelance" | "investment" | "other";

export type IncomeFormDataType = {
  name: string;
  amount: string;
  date: string;
  category: string;
  userId: string;
};

export type IncomeFormErrorsType = {
  [key: string]: string;
};

export type IncomeDataType = {
  _id: string;
  name: string;
  amount: number;
  date: string;
  category: string;
  userId: string;
};

export type SortOrderType = "asc" | "desc" | "";

export type SortFieldType = "Category" | "Amount" | "Date" | "Name" | "";
