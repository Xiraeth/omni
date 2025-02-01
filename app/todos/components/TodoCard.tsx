import clsx from "clsx";
import {
  TodoPriorityType,
  TodoType,
  UpsertTodoFormDataType,
} from "../lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { UseMutationResult } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { getPriorityColor } from "../lib/functions";
import { getDateInfo } from "@/app/common/functions/getTemporalInfo";
import { getTimeInfo } from "@/app/common/functions/getTemporalInfo";
import ButtonOuttlined from "@/app/components/ButtonOuttlined";

const TodoCard = ({
  todo,
  hoveredTodoId,
  setHoveredTodoId,
  toggleCompletedMutation,
  setInitialValues,
  setIsEditTodoOpen,
  deleteTodo,
}: {
  todo: TodoType;
  hoveredTodoId: string | null;
  setHoveredTodoId: (id: string | null) => void;
  toggleCompletedMutation: UseMutationResult<any, any, any, any>;
  setInitialValues: (values: UpsertTodoFormDataType) => void;
  setIsEditTodoOpen: (open: boolean) => void;
  deleteTodo: (id: string) => void;
}) => {
  const { DDMMYYYY: todoDDMMYYYY } = getDateInfo(new Date(todo?.dateFor));
  const todoHHMMSS = getTimeInfo(todo?.timeFor || "");

  const priorityColor = getPriorityColor(todo?.priority as TodoPriorityType);

  const priorityColorWithBreakpoints = getPriorityColor(
    todo?.priority as TodoPriorityType,
    true
  );

  const editClickHandler = () => {
    setInitialValues({
      _id: todo._id,
      title: todo?.title,
      description: todo?.description,
      dateFor: todo?.dateFor,
      timeFor: todo?.timeFor,
      priority: todo?.priority as TodoPriorityType,
      category: todo?.category?.name,
    });
    setIsEditTodoOpen(true);
  };

  const deleteClickHandler = () => {
    deleteTodo(todo._id);
  };

  return (
    <div
      key={todo?._id}
      className={clsx(
        "px-4 py-2 shadow-md rounded-md w-full flex flex-col lg:flex-row items-center lg:items-start gap-2 lg:gap-4 text-dark dark:text-light "
      )}
    >
      {/* container for checkbox and title, description, priority, time, date and buttons for editing and deleting */}
      <div className="flex w-full justify-between gap-4">
        {/* checkbox for completing the todo */}
        <div
          onPointerEnter={() => {
            setHoveredTodoId(todo._id);
          }}
          onPointerLeave={() => {
            setHoveredTodoId(null);
          }}
          className="h-[16px] pt-[2px] mb-2 lg:mb-0"
        >
          <Checkbox
            checked={todo?.completed}
            onCheckedChange={(checked) => {
              toggleCompletedMutation.mutate({
                data: {
                  todoId: todo._id,
                  completed: checked as boolean,
                },
              });
            }}
          />
        </div>

        {/* title, description, priority, time, date and buttons for editing and deleting */}
        <div className="w-full flex justify-between gap-4 lg:gap-0 lg:justify-between flex-row lg:flex-row">
          <div
            className={clsx(
              hoveredTodoId === todo?._id && "line-through",
              todo?.completed &&
                "line-through bg-gray-300/50 dark:bg-gray-700/50 opacity-90"
            )}
          >
            <div className="flex items-center gap-4">
              <p
                className={clsx(
                  "text-md lg:text-base font-roboto font-bold",
                  priorityColorWithBreakpoints
                )}
              >
                {todo?.title}
              </p>

              <div className="hidden lg:flex gap-2">
                <FontAwesomeIcon
                  icon={faPen}
                  className="flex justify-center items-center text-sm cursor-pointer"
                  onClick={editClickHandler}
                />

                <FontAwesomeIcon
                  icon={faTrash}
                  className="flex justify-center items-center text-sm cursor-pointer text-red-500"
                  onClick={deleteClickHandler}
                />
              </div>
            </div>
            <p className="hidden lg:block text-xs lg:text-sm font-geistSans">
              {todo?.description}
            </p>
            <p
              className={clsx(
                "hidden lg:block text-xs lg:text-sm font-geistSans",
                priorityColor
              )}
            >
              {todo?.priority?.slice(0, 1).toUpperCase() +
                todo?.priority?.slice(1)}{" "}
              priority
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end justify-normal lg:justify-end">
            <p className="hidden lg:block font-geistSans">
              {todo?.category?.name}
            </p>
            <p className="hidden lg:block text-sm font-geistSans opacity-70 italic">
              {todoDDMMYYYY}
            </p>
            <p className="text-sm font-geistSans opacity-70 italic">
              {todoHHMMSS}
            </p>
          </div>
        </div>
      </div>

      <div className="space-x-2 flex lg:hidden w-full">
        <ButtonOuttlined
          text="Edit"
          className="text-xs px-2 py-[4px] w-1/3"
          hasPadding={false}
          variant="default"
          onClick={editClickHandler}
        />

        <ButtonOuttlined
          text="Delete"
          className="text-xs px-2 py-[4px] w-1/3"
          hasPadding={false}
          variant="danger"
          onClick={deleteClickHandler}
        />
      </div>
    </div>
  );
};

export default TodoCard;
