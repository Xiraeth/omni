import clsx from "clsx";
import { ButtonVariantsType } from "../common/types";

const ButtonOuttlined = ({
  text,
  onClick,
  type = "button",
  className,
  hasPadding = true,
  variant = "default",
}: {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  hasPadding?: boolean;
  variant?: ButtonVariantsType;
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={clsx(
        "border-[1px] rounded-md bg-transparent transition-colors duration-150 shadow-md",
        className,
        hasPadding ? "px-4 py-2" : "",
        variant === "default" &&
          "border-dark dark:border-white/30 hover:bg-dark hover:text-white dark:hover:bg-light dark:hover:text-dark",
        variant === "success" &&
          "border-green-500 dark:border-green-400 hover:bg-green-500 hover:text-white dark:hover:bg-green-400 dark:hover:text-dark",
        variant === "warning" &&
          "border-yellow-500 dark:border-yellow-400 hover:bg-yellow-500 hover:text-white dark:hover:bg-yellow-400 dark:hover:text-dark",
        variant === "danger" &&
          "border-red-600 dark:border-red-400 hover:bg-red-600 text-red-600 dark:text-red-400 hover:text-white dark:hover:bg-red-400 dark:hover:text-dark"
      )}
    >
      {text}
    </button>
  );
};

export default ButtonOuttlined;
