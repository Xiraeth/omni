import { Controller, useForm } from "react-hook-form";
import { TodoCategoryType } from "../types";
import FormElement from "@/app/components/FormElement";

const CreateCategoryForm = ({
  onCancelClick,
}: {
  onCancelClick: () => void;
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoCategoryType>({ mode: "onSubmit" });

  const onSubmit = (data: TodoCategoryType) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-16 flex flex-col gap-4 w-full text-sm px-16"
    >
      <Controller
        control={control}
        name="name"
        rules={{ required: "Name is required" }}
        render={({ field: { onChange, value } }) => (
          <div className="flex xl:flex-row flex-col xl:items-center justify-between w-full xl:gap-2">
            <label htmlFor="name" className="text-center xl:text-start">
              Name
            </label>

            <FormElement errorMsg={errors?.name?.message}>
              <input
                {...register("name")}
                id="name"
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                className="px-4 py-2 border-[1px] border-black/15 rounded-md outline-none bg-white/10 hover:bg-white/20 focus:border-black/25 focus:bg-white/35 transition-all duration-150 shadow-sm dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/20 dark:focus:border-white/25 dark:focus:bg-white/35"
                autoComplete="off"
              />
            </FormElement>
          </div>
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <FormElement errorMsg={errors?.description?.message}>
            <div className="flex xl:flex-row flex-col xl:items-center justify-between w-full xl:gap-2">
              <label
                htmlFor="description"
                className="mt-4 xl:mt-2 text-center xl:text-start"
              >
                Description
              </label>
              <FormElement errorMsg={errors?.description?.message}>
                <input
                  {...register("description")}
                  id="description"
                  value={value || ""}
                  onChange={(e) => onChange(e.target.value)}
                  className="px-4 py-2 border-[1px] border-black/15 rounded-md outline-none bg-white/10 hover:bg-white/20 focus:border-black/25 focus:bg-white/35 transition-all duration-150 shadow-sm dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/20 dark:focus:border-white/25 dark:focus:bg-white/35"
                  autoComplete="off"
                />
              </FormElement>
            </div>
          </FormElement>
        )}
      />

      <div className="flex justify-center w-full gap-4 mt-4 text-xs">
        <button
          onClick={onCancelClick}
          type="reset"
          className="px-4 py-2 bg-transparent border-[1px] border-dark rounded-md hover:bg-dark hover:text-white dark:border-white/30 dark:hover:bg-light dark:hover:text-dark transition-colors duration-150"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-transparent border-[1px] border-dark rounded-md hover:bg-dark hover:text-white dark:border-white/30 dark:hover:bg-light dark:hover:text-dark transition-colors duration-150"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default CreateCategoryForm;
