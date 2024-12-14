"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import Link from "next/link";
import SignupWithGoogle from "../components/SignupWithGoogle";
import SignupWithEmail from "../components/SignupWithEmail";
import FormElement from "../components/FormElement";

type ViewMode = "email" | "google" | undefined;

interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(undefined);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SignupFormData) => {
    console.log("Form submitted with data:", data);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full transition-all duration-150">
      <div className="w-[300px] sm:w-[500px] mx-auto bg-zinc-50 flex flex-col items-center justify-center gap-2 py-12 px-6 sm:px-20 h-fit drop-shadow-lg shadow-black rounded-lg transition-all duration-150">
        <p className="text-xl sm:text-2xl font-bold font-geistSans transition-all duration-150">
          Sign Up
        </p>
        {viewMode !== "email" ? (
          <p className="opacity-80 font-geistSans mb-4 text-center text-sm sm:text-base transition-all duration-150">
            Choose a way to create your account
          </p>
        ) : (
          <p className="opacity-80 font-geistSans mb-4 text-center text-sm sm:text-base transition-all duration-150">
            Fill in the form to create your account
          </p>
        )}
        {viewMode === "email" ? (
          <form
            className="w-full flex flex-col items-center justify-center gap-2 mb-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <FormElement
                  errorMsg={errors?.email?.message}
                  InputProps={{
                    type: "email",
                    placeholder: "Email",
                    ...field,
                  }}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field }) => (
                <FormElement
                  errorMsg={errors?.password?.message}
                  InputProps={{
                    type: "password",
                    placeholder: "Password",
                    ...field,
                  }}
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Please confirm your password",
                validate: (value, formValues) =>
                  value === formValues.password || "Passwords do not match",
              }}
              render={({ field }) => (
                <FormElement
                  errorMsg={errors?.confirmPassword?.message}
                  InputProps={{
                    type: "password",
                    placeholder: "Confirm Password",
                    ...field,
                  }}
                />
              )}
            />

            <button
              type="submit"
              className="w-full flex items-center justify-center border-[1px] border-black/20 rounded-md py-2 shadow-sm shadow-black/10 transition-all duration-200 font-roboto font-bold mb-2 text-sm sm:text-base bg-dark text-white hover:bg-slate-700/90 active:bg-slate-700/95"
            >
              <div className="flex items-center justify-center text-center w-[160px] sm:w-[180px]">
                Sign up
              </div>
            </button>
          </form>
        ) : null}
        {viewMode !== "email" ? <SignupWithGoogle /> : null}
        {viewMode !== "email" && (
          <SignupWithEmail onClick={() => setViewMode("email")} />
        )}
        <div className="flex items-center justify-center gap-2 font-lato opacity-80 mb-8 transition-all duration-150 text-sm sm:text-base">
          <p>Already have an account?</p>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-400 transition-all duration-150"
          >
            Sign in
          </Link>
        </div>
        {viewMode === "email" ? (
          <>
            <div className="w-full flex items-center justify-center gap-2 mb-4">
              <div className="h-[2px] w-full bg-black/10"></div>
              <span className="text-sm sm:text-base">or</span>
              <div className="h-[2px] w-full bg-black/10"></div>
            </div>
            <SignupWithGoogle />
          </>
        ) : null}
        <div className="text-xs sm:text-base font-geistSans opacity-80 text-center transition-all duration-150">
          This is a free and open source project. You do not have to agree to or
          pay for anything.
        </div>
      </div>
    </div>
  );
};

export default Signup;
