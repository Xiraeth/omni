export type IncomeCategoriesType =
  | "salary"
  | "freelance"
  | "investment"
  | "other"
  | undefined;

export type IncomeFiltersType = {
  filterName?: string;
  dateFrom?: string;
  dateTo?: string;
  toggledCategories?: IncomeCategoriesType[];
};

export type IncomeFormDataType = {
  name: string;
  amount: string;
  date: string;
  category: IncomeCategoriesType;
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
  category: IncomeCategoriesType;
  userId: string;
};

export type SortOrderType = "asc" | "desc" | "";

export type SortFieldType = "Category" | "Amount" | "Date" | "Name" | "";
