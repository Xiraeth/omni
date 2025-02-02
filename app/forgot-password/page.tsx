"use client";

import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import FormElement from "../components/FormElement";
import Input from "../components/Input";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useCustomToast from "@/hooks/useCustomToast";
import { LucideLoader } from "lucide-react";
import { useState } from "react";

type ForgotPasswordFormData = {
  email: string;
};

const ForgotPasswordPage = () => {
  const successToast = useCustomToast({ type: "success" });
  const errorToast = useCustomToast({ type: "error" });
  const [viewMode, setViewMode] = useState<"forgot-password" | "success">(
    "forgot-password"
  );

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    mode: "onSubmit",
  });

  const { mutate: sendEmailMutation, isPending } = useMutation({
    mutationFn: async (email: string) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/forgotPassword`,
        {
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
    onSuccess: (data: any) => {
      console.log(data);
      successToast("Email sent successfully");
      setValue("email", "");
      setViewMode("success");
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        errorToast(error.response?.data?.error || "Error sending email");
      } else {
        errorToast("Error sending email");
      }
    },
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    sendEmailMutation(data.email);
  };

  const emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen w-full transition-all duration-150 text-dark dark:text-light font-lato`}
    >
      {viewMode === "forgot-password" ? (
        <div className="w-[300px] sm:w-[500px] mx-auto bg-slate-200 dark:bg-slate-800 flex flex-col items-center justify-center gap-2 py-12 px-6 sm:px-20 h-fit drop-shadow-lg shadow-black rounded-lg transition-all duration-150 dark:text-white">
          <p className="text-xl font-bold">Forgot your passowrd?</p>
          <p className="text-center ">
            Enter your email below to get a password recovery email
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Enter your email",
                validate: (value) => {
                  if (!emailRegexp.test(value)) return "Invalid email";
                  return true;
                },
              }}
              render={({ field }) => (
                <FormElement errorMsg={errors.email?.message as string}>
                  <Input
                    type="text"
                    placeholder="Email"
                    {...field}
                    value={field.value || ""}
                  />
                </FormElement>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? <LucideLoader /> : "Send password recovery email"}
            </Button>
          </form>
        </div>
      ) : (
        <div className="w-[300px] sm:w-[500px] mx-auto bg-slate-200 dark:bg-slate-800 flex flex-col items-center justify-center gap-2 py-12 px-6 sm:px-20 h-fit drop-shadow-lg shadow-black rounded-lg transition-all duration-150 dark:text-white">
          <p className="text-xl font-bold">Email sent successfully</p>
          <p className="text-center">
            Please check your email for a password recovery link
          </p>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
