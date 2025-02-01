// import { TodoSortByType, TodoType } from "./types";

import { TodoSortByType, TodoSortOrderType, TodoType } from "./types";

const priorityOrder = {
  high: 1,
  medium: 2,
  low: 3,
};

export const getPriorityColor = (priority: string, hasBreakpoints = false) => {
  if (priority?.toLowerCase() === "high")
    return hasBreakpoints
      ? "text-red-600 dark:text-red-400 md:text-inherit dark:md:text-inherit"
      : "text-red-600 dark:text-red-400";
  if (priority?.toLowerCase() === "medium")
    return hasBreakpoints
      ? "text-amber-600 dark:text-amber-400 md:text-inherit dark:md:text-inherit"
      : "text-amber-600 dark:text-amber-400";
  if (priority?.toLowerCase() === "low")
    return hasBreakpoints
      ? "text-blue-600 dark:text-blue-400 md:text-inherit dark:md:text-inherit"
      : "text-blue-600 dark:text-blue-400";

  return hasBreakpoints
    ? "text-gray-600 dark:text-gray-400 md:text-inherit dark:md:text-inherit"
    : "text-gray-600 dark:text-gray-400";
};

export const handleTodoSort = (
  todos: TodoType[],
  sortBy: TodoSortByType,
  sortOrder: TodoSortOrderType
) => {
  if (sortBy?.toLocaleLowerCase() === "time") {
    return todos.sort((a, b) => {
      // Handle cases where either timeFor is null/undefined
      if (!a.timeFor) return sortOrder === "asc" ? 1 : -1;
      if (!b.timeFor) return sortOrder === "asc" ? -1 : 1;

      // Convert time strings (HH:mm) to minutes since midnight
      const getMinutes = (timeStr: string): number => {
        const [hours, minutes] = timeStr.split(":").map(Number);
        return hours * 60 + minutes;
      };

      const timeA = getMinutes(a.timeFor);
      const timeB = getMinutes(b.timeFor);

      // Handle invalid times
      if (isNaN(timeA)) return sortOrder === "asc" ? 1 : -1;
      if (isNaN(timeB)) return sortOrder === "asc" ? -1 : 1;

      const comparison = timeA - timeB;
      return sortOrder === "asc" ? comparison : -comparison;
    });
  }

  if (sortBy?.toLocaleLowerCase() === "priority") {
    return todos.sort((a, b) => {
      const priorityA =
        priorityOrder[a.priority.toLowerCase() as keyof typeof priorityOrder];
      const priorityB =
        priorityOrder[b.priority.toLowerCase() as keyof typeof priorityOrder];
      const comparison = priorityA - priorityB;
      return sortOrder === "asc" ? comparison : -comparison;
    });
  }

  return todos; // Return unsorted array if sortBy doesn't match
};

export const getAmountOfTodosColor = (amount: number) => {
  if (amount === 0) return "text-gray-600 dark:text-gray-400";
  if (amount > 0 && amount <= 3) return "text-green-600 dark:text-green-400";
  if (amount > 3 && amount <= 6) return "text-amber-600 dark:text-amber-400";
  if (amount > 6 && amount <= 9) return "text-orange-600 dark:text-orange-400";
  if (amount > 9) return "text-red-600 dark:text-red-400";

  return "text-dark dark:text-light";
};
