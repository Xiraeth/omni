export type ExpensesCategoriesType =
  | "food"
  | "transportation"
  | "entertainment"
  | "shopping"
  | "healthcare"
  | "education"
  | "travelling"
  | "other"
  | "house"
  | undefined;

export type ExpensesFiltersType = {
  filterName?: string;
  dateFrom?: string;
  dateTo?: string;
  toggledCategories?: ExpensesCategoriesType[];
};

export type ExpensesFormDataType = {
  name: string;
  amount: string;
  date: string;
  category: ExpensesCategoriesType;
  userId: string;
};

export type ExpensesFormErrorsType = {
  [key: string]: string;
};

export type ExpensesDataType = {
  _id: string;
  name: string;
  amount: number;
  date: string;
  category: ExpensesCategoriesType;
  userId: string;
};

export type SortOrderType = "asc" | "desc" | "";

export type SortFieldType = "Category" | "Amount" | "Date" | "Name" | "";
