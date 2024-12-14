"use client";

import { useForm, Controller } from "react-hook-form";

import FormElement from "../components/FormElement";
import { LoginFormData } from "../common/types";
import ConnectWithGoogle from "../components/SignupWithGoogle";
import Link from "next/link";
import ConnectButton from "../components/ConnectButton";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    mode: "onSubmit",
  });

  const onSubmit = async (data: LoginFormData) => {
    const { email, password } = data;

    try {
      const req = await fetch("http://localhost:3004/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const response = await req.json();

      if (response.error) {
        setError("root", { message: response.error });
        return;
      }

      if (response.user) {
        router.push("/login?userCreated=true");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("root", {
        message: "An unexpected error occurred. Please try again later.",
      });
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full transition-all duration-150">
      <div className="w-[300px] sm:w-[500px] mx-auto bg-zinc-50 dark:bg-slate-800 flex flex-col items-center justify-center gap-2 py-12 px-6 sm:px-20 h-fit drop-shadow-lg shadow-black rounded-lg transition-all duration-150 dark:text-white">
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
          {errors?.root?.message && (
            <p className="text-red-500 font-bold text-xs font-geistSans">
              {errors?.root?.message}
            </p>
          )}
          <ConnectButton text="Log in" />
        </form>
        <div className="flex items-center justify-center gap-2 font-lato opacity-80 mb-2 transition-all duration-150 text-xs sm:text-sm">
          <p>Don&apos;t have an account?</p>
          <Link
            href="/signup"
            className="text-blue-500 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-all duration-150"
          >
            Sign up
          </Link>
        </div>
        <div className="w-full flex items-center justify-center gap-2 mb-4">
          <div className="h-[2px] w-full bg-black/10 dark:bg-white/10 transition-all duration-150"></div>
          <span className="text-sm sm:text-base">or</span>
          <div className="h-[2px] w-full bg-black/10 dark:bg-white/10 transition-all duration-150"></div>
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
