import clsx from "clsx";
import { useState } from "react";
import { TodoCategoryType } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useUser } from "@/app/context/UserContext";
import useCustomToast from "@/hooks/useCustomToast";
import { useTodos } from "../context/TodosProvider";
import Modal from "@/app/components/Modal";
import CreateCategoryModal from "./CreateCategoryModal";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CategoriesSection = ({
  todoCategories,
}: {
  todoCategories: TodoCategoryType[];
}) => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [isDeleteCategoryOpen, setIsDeleteCategoryOpen] =
    useState<boolean>(false);
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] =
    useState<boolean>(false);

  const { selectedCategory, setSelectedCategory } = useTodos();

  const deleteSuccessToast = useCustomToast({
    message: "Category deleted successfully",
    type: "success",
  });

  const { mutate: deleteTodoCategoryMutation, isPending } = useMutation({
    mutationFn: async (categoryId: string) => {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/deleteTodoCategory`,
        { data: { categoryId, userId: user?.id } }
      );
      return response.data;
    },
    onSuccess: (data: TodoCategoryType) => {
      setIsDeleteCategoryOpen(false);
      deleteSuccessToast();
      queryClient?.setQueryData(
        ["todoCategories"],
        (oldData: TodoCategoryType[]) => {
          return oldData.filter(
            (category: TodoCategoryType) => category._id !== data._id
          );
        }
      );
    },
  });

  const handleDeleteTodoCategory = (categoryId: string) => {
    deleteTodoCategoryMutation(categoryId);
  };

  const handleCategoryClick = (category: TodoCategoryType) => {
    if (selectedCategory?._id === category._id) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <div
      className={clsx(
        "leftPart pt-6 bg-slate-400/15 border-r-[1px] border-r-black/20 dark:bg-black/20 flex flex-col items-center transition-all duration-300 ease-out w-[150px] lg:w-[200px] xl:w-[250px]"
      )}
    >
      {isDeleteCategoryOpen && (
        <Modal
          onConfirm={() =>
            handleDeleteTodoCategory(selectedCategory?._id || "")
          }
          onCancel={() => setIsDeleteCategoryOpen(false)}
          header="Delete Category"
          text="Are you sure you want to delete this category?"
        />
      )}

      {isCreateCategoryOpen && (
        <CreateCategoryModal
          onCancelClick={() => setIsCreateCategoryOpen(false)}
        />
      )}
      <div className="w-full flex flex-col">
        <p className="text-xl font-bold mx-auto mb-6 pb-4 border-b-[1px] border-b-black/15 w-8/12 text-center">
          Categories
        </p>
        <div className="mb-2 flex flex-col gap-4 px-8">
          {todoCategories?.map((category: TodoCategoryType) => (
            <div
              onClick={() => handleCategoryClick(category)}
              key={category._id}
              className={clsx(
                "flex justify-between items-center rounded-md px-4 py-2 hover:bg-slate-400/20 transition-colors duration-200 cursor-pointer dark:hover:bg-black/30",
                selectedCategory?._id === category._id &&
                  "border-[1px] border-sky-400 dark:border-amber-400 bg-slate-400/30 dark:bg-black/30",
                selectedCategory?._id !== category._id &&
                  "bg-slate-300 dark:bg-black/20"
              )}
            >
              <p className="font-montserrat text-lg select-none">
                {category.name}
              </p>
              <p
                onClick={() => setIsDeleteCategoryOpen(true)}
                className="text-xl text-dark dark:text-light hover:text-red-500 cursor-pointer dark:hover:text-red-500 font-bold font-montserrat transition-colors duration-200 select-none"
              >
                x
              </p>
            </div>
          ))}
        </div>
        <p
          onClick={() => setIsCreateCategoryOpen(true)}
          className={clsx(
            "opacity-70 lg:text-base text-sm cursor-pointer py-2 w-full flex items-center gap-1 justify-center hover:opacity-50 transition-opacity duration-200 relative select-none",
            isDeleteCategoryOpen ? "-z-10" : "z-100"
          )}
        >
          <span className="lg:text-2xl text-base">+</span> New category
        </p>
      </div>
    </div>
  );
};

export default CategoriesSection;
