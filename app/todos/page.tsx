"use client";

import OpenNavbarButton from "@/app/components/OpenNavbarButton";
import { useUser } from "@/app/context/UserContext";
import Todos from "@/app/todos/components/Todos";
import TodosProvider from "@/app/todos/context/TodosProvider";

const TodosPage = () => {
  const { user } = useUser();

  if (!user) {
    return <div>Please log in to continue</div>;
  }

  return (
    <div>
      <OpenNavbarButton />

      <TodosProvider>
        <Todos />
      </TodosProvider>
    </div>
  );
};

export default TodosPage;
