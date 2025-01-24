import { Controller } from "react-hook-form";
import { IncomeFormDataType } from "@/app/types/income";
import { useForm } from "react-hook-form";
import FormElement from "@/app/components/FormElement";
import NameInput from "./NameInput";
import Dropdown from "@/app/components/Dropdown";
import AmountInput from "./AmountInput";
import DateInput from "./DateInput";
import GenericButton from "@/app/components/GenericButton";
import { useSession } from "next-auth/react";
import request from "@/app/common/functions/request";
import useCustomToast from "@/hooks/useCustomToast";

const AddIncomeForm = () => {
  const { data: session } = useSession();

  const successToast = useCustomToast({
    message: "Income added successfully",
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<IncomeFormDataType>({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      amount: "",
      date: "",
      category: "",
      userId: "",
    },
  });

  const onSubmit = async (data: IncomeFormDataType) => {
    const dataToSubmit = {
      ...data,
      userId: session?.user?.id,
    };

    if (Object.keys(errors).length === 0) {
      const response = await request({
        url: "income",
        data: dataToSubmit,
        method: "POST",
      });

      if (response.error) {
        setError("root", { message: response.error });
        return;
      }

      if (response?.income) {
        successToast();
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    }
  };

  return (
    <form
      id="add-income-row"
      onSubmit={handleSubmit(onSubmit)}
      className="w-10/12 p-4 mx-auto flex flex-col lg:flex-row items-center md:items-start mt-20 gap-4"
    >
      <div className="lg:w-1/2 w-full">
        <Controller
          control={control}
          name="name"
          rules={{
            required: "Name is required",
          }}
          render={({ field: { onChange, value } }) => (
            <FormElement errorMsg={errors?.name?.message}>
              <NameInput
                onChange={(e) => onChange(e.target.value)}
                value={value}
              />
            </FormElement>
          )}
        />
      </div>

      <div className="flex gap-4 md:flex-row flex-col w-full lg:justify-end">
        <Controller
          control={control}
          name="category"
          rules={{
            required: "Category is required",
          }}
          render={({ field: { onChange, value } }) => (
            <FormElement errorMsg={errors?.category?.message}>
              <Dropdown
                options={["Salary", "Freelance", "Investment", "Other"]}
                placeholder="Category"
                value={value}
                onSelect={(option) => onChange(option)}
              />
            </FormElement>
          )}
        />

        <Controller
          control={control}
          name="amount"
          rules={{
            required: "Amount is required",
          }}
          render={({ field: { onChange, value } }) => (
            <FormElement errorMsg={errors?.amount?.message}>
              <AmountInput
                onChange={(e) => onChange(Number(e.target.value))}
                value={value}
              />
            </FormElement>
          )}
        />

        <Controller
          control={control}
          name="date"
          rules={{
            required: "Date is required",
          }}
          render={({ field: { onChange, value } }) => (
            <FormElement errorMsg={errors?.date?.message}>
              <DateInput
                onChange={(e) => onChange(e.target.value)}
                value={value}
              />
            </FormElement>
          )}
        />
        <GenericButton text="Add income" width="md" />
      </div>
    </form>
  );
};

export default AddIncomeForm;
