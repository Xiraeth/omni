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

export const DAYS_OF_WEEK_SHORT = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

export const DAYS_OF_WEEK_LONG = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const MONTHS_OF_YEAR_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const MONTHS_OF_YEAR_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
