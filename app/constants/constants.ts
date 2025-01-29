import { CategoriesType, FiltersType } from "../income/types";

export const PUBLIC_ROUTES = ["/login", "/signup", "/"];

export const INCOME_CATEGORIES = ["Salary", "Freelance", "Investment", "Other"];

export const SORT_FIELDS = ["Date", "Amount", "Category", "Name"];

export const INCOME_CATEGORIES_LOWERCASE: CategoriesType[] = [
  "salary",
  "freelance",
  "investment",
  "other",
];

export const INITIAL_FILTERS_DATA: FiltersType = {
  filterName: "",
  dateFrom: "",
  dateTo: "",
  toggledCategories: INCOME_CATEGORIES_LOWERCASE,
};
