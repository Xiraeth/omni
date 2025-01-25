import clsx from "clsx";

type ButtonWidthType = "full" | "lg" | "md" | "sm";

const GenericButton = ({
  text,
  width = "full",
}: {
  text: string;
  width?: ButtonWidthType;
}) => {
  return (
    <button
      type="submit"
      className={clsx(
        "flex items-center px-4 justify-center border-[1px] border-black/20 rounded-md py-2 shadow-sm shadow-black/10 transition-all duration-200 font-roboto font-bold text-sm sm:text-base bg-dark text-white hover:bg-slate-700/90 active:bg-slate-700/95 dark:bg-light dark:text-dark dark:hover:bg-slate-300/90 dark:active:bg-slate-300/70 h-[46px]",
        width === "full"
          ? "min-w-full max-w-full"
          : width === "lg"
          ? "md:min-w-[200px] md:max-w-[200px] w-full"
          : width === "md"
          ? "md:min-w-[150px] md:max-w-[150px] w-full"
          : "md:min-w-[100px] md:max-w-[100px] w-full"
      )}
    >
      {text}
    </button>
  );
};

export default GenericButton;
