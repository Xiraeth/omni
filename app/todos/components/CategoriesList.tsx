import clsx from "clsx";
import { TodoCategoryType } from "../lib/types";
import { LucidePencil, LucideTrash } from "lucide-react";

const CategoriesList = ({
  todoCategories,
  handleCategoryClick,
  selectedCategory,
  setIsCreateCategoryOpen,
  isDeleteCategoryOpen,
  setIsDeleteCategoryOpen,
  setClickedCategoryToEdit,
  setDeleteCategoryId,
}: {
  todoCategories: TodoCategoryType[];
  handleCategoryClick: (category: TodoCategoryType) => void;
  selectedCategory: TodoCategoryType | null;
  setIsCreateCategoryOpen: (isOpen: boolean) => void;
  isDeleteCategoryOpen: boolean;
  setIsDeleteCategoryOpen: (isOpen: boolean) => void;
  setClickedCategoryToEdit: (category: TodoCategoryType | null) => void;
  setDeleteCategoryId: (id: string | null) => void;
}) => {
  return (
    <div className="w-full flex flex-col">
      <p className="text-base lg:text-xl font-bold mx-auto mb-6 pb-4 border-b-[1px] border-b-black/15 dark:border-b-white/15 w-8/12 text-center">
        Categories
      </p>
      <div className="mb-2 flex flex-col gap-4 px-4">
        {todoCategories?.map((category: TodoCategoryType) => (
          <div
            onClick={() => handleCategoryClick(category)}
            key={category._id}
            className={clsx(
              "flex justify-between items-center rounded-md px-4 py-2 hover:bg-slate-400/20 transition-colors duration-200 cursor-pointer dark:hover:bg-black/30 gap-[4px] lg:gap-0",
              selectedCategory?._id === category._id &&
                "border-[1px] border-sky-400 dark:border-amber-400 bg-slate-400/30 dark:bg-black/30",
              selectedCategory?._id !== category._id &&
                "bg-slate-300 dark:bg-black/20"
            )}
          >
            <p className="font-montserrat text-sm lg:text-lg select-none truncate">
              {category.name}
            </p>

            <div className="flex gap-4 md:gap-1 lg:gap-2">
              <LucidePencil
                className="text-dark dark:text-light hover:text-indigo-500 cursor-pointer dark:hover:text-blue-600 font-bold font-montserrat transition-colors duration-200 select-none size-4"
                onClick={(e) => {
                  setClickedCategoryToEdit(category);
                  setIsCreateCategoryOpen(true);
                  e.stopPropagation();
                }}
              />
              <LucideTrash
                className="text-dark dark:text-light hover:text-red-500 cursor-pointer dark:hover:text-red-500 font-bold font-montserrat transition-colors duration-200 select-none size-4"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteCategoryId(category._id);
                  setIsDeleteCategoryOpen(true);
                }}
              />
            </div>
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
  );
};

export default CategoriesList;
