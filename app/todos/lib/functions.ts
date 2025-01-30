import { TodoSortByType, TodoType } from "./types";

export const getPriorityColor = (priority: string) => {
  if (priority?.toLowerCase() === "high") return "text-red-500";
  if (priority?.toLowerCase() === "medium")
    return "text-amber-600 dark:text-amber-400";
  if (priority?.toLowerCase() === "low") return "text-blue-500";

  return "text-gray-500";
};

// export const handleSort = (todos: TodoType[], sortBy: TodoSortByType) => {
//   return todos.sort((a, b) => {
//     if (sortBy === "time") return a.createdAt - b.createdAt;
//     if (sortBy === "priority") return a.priority - b.priority;
//   });
// };
