import { CategoriesType } from "../types/income";

export const PUBLIC_ROUTES = ["/login", "/signup", "/"];

export const INCOME_CATEGORIES = ["Salary", "Freelance", "Investment", "Other"];

export const SORT_FIELDS = ["Date", "Amount", "Category", "Name"];

export const TOGGLED_CATEGORIES: CategoriesType[] = [
  "salary",
  "freelance",
  "investment",
  "other",
];

export const TOGGLED_CATEGORIES_LABELS = [
  "Salary",
  "Freelance",
  "Investments",
  "Other",
];
