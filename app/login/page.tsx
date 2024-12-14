"use client";

import { useForm, Controller } from "react-hook-form";

import FormElement from "../components/FormElement";
import { LoginFormData } from "../common/types";
import ConnectWithGoogle from "../components/SignupWithGoogle";
import Link from "next/link";

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: "onSubmit",
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Form submitted with data:", data);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full transition-all duration-150">
      <div className="w-[300px] sm:w-[500px] mx-auto bg-zinc-50 flex flex-col items-center justify-center gap-2 py-12 px-6 sm:px-20 h-fit drop-shadow-lg shadow-black rounded-lg transition-all duration-150">
        <p className="text-xl sm:text-2xl font-bold font-geistSans transition-all duration-150">
          Login
        </p>
        <form
          className="w-full flex flex-col items-center justify-center gap-2"
          onSubmit={handleSubmit(onSubmit)}
          id="login-form"
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
                  value: field.value || "",
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
                  value: field.value || "",
                }}
              />
            )}
          />

          <button
            type="submit"
            className="w-full flex items-center justify-center border-[1px] border-black/20 rounded-md py-2 shadow-sm shadow-black/10 transition-all duration-200 font-roboto font-bold text-sm sm:text-base bg-dark text-white hover:bg-slate-700/90 active:bg-slate-700/95"
          >
            <div className="flex items-center justify-center text-center w-[160px] sm:w-[180px]">
              Log in
            </div>
          </button>
        </form>
        <div className="flex items-center justify-center gap-2 font-lato opacity-80 mb-2 transition-all duration-150 text-xs sm:text-sm">
          <p>Don't have an account?</p>
          <Link
            href="/signup"
            className="text-blue-600 hover:text-blue-400 transition-all duration-150"
          >
            Sign up
          </Link>
        </div>
        <div className="w-full flex items-center justify-center gap-2 mb-4">
          <div className="h-[2px] w-full bg-black/10"></div>
          <span className="text-sm sm:text-base">or</span>
          <div className="h-[2px] w-full bg-black/10"></div>
        </div>
        <ConnectWithGoogle text="Login with Google" />
        <div className="text-xs sm:text-sm font-geistSans opacity-80 text-center transition-all duration-150">
          This is a free and open source project. You do not have to agree to or
          pay for anything.
        </div>
      </div>
    </div>
  );
};

export default Login;
