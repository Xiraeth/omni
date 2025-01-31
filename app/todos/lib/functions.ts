// import { TodoSortByType, TodoType } from "./types";

import { TodoSortByType, TodoSortOrderType, TodoType } from "./types";

const priorityOrder = {
  high: 1,
  medium: 2,
  low: 3,
};

export const getPriorityColor = (priority: string) => {
  if (priority?.toLowerCase() === "high") return "text-red-500";
  if (priority?.toLowerCase() === "medium")
    return "text-amber-600 dark:text-amber-400";
  if (priority?.toLowerCase() === "low") return "text-blue-500";

  return "text-gray-500";
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
