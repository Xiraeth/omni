import { TodoType } from "../types";

const TodosSection = ({ todos }: { todos: TodoType[] }) => {
  return (
    <div className="centerPart pt-6 grow flex flex-col items-center">
      <p className="text-xl font-bold">Display and add todos</p>
    </div>
  );
};

export default TodosSection;
