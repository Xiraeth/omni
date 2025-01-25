export type CategoriesType =
  | "salary"
  | "freelance"
  | "investment"
  | "other"
  | undefined;

export type FiltersType = {
  filterName?: string;
  dateFrom?: string;
  dateTo?: string;
  toggledCategories?: CategoriesType[];
};

export type IncomeFormDataType = {
  name: string;
  amount: string;
  date: string;
  category: CategoriesType;
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
  category: CategoriesType;
  userId: string;
};

export type SortOrderType = "asc" | "desc" | "";

export type SortFieldType = "Category" | "Amount" | "Date" | "Name" | "";
