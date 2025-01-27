import { createContext, useContext, useState } from "react";
import { TodoType } from "@/app/todos/types";

const initialTodosContext: {
  todos: TodoType[];
  setTodos: (todos: TodoType[]) => void;
} = {
  todos: [],
  setTodos: () => {},
};

const TodosContext = createContext(initialTodosContext);

const TodosProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error("useTodos must be used within a TodosProvider");
  }
  return context;
};

export default TodosProvider;
