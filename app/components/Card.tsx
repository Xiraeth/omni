import clsx from "clsx";

const Card = ({
  children,
  hasPadding = true,
  className,
  height,
  width,
}: {
  children: React.ReactNode;
  hasPadding?: boolean;
  className?: string;
  height?: string;
  width?: string;
}) => {
  return (
    <div
      className={clsx(
        "mx-auto bg-slate-200 dark:bg-slate-800 flex flex-col items-center justify-center gap-2  drop-shadow-lg shadow-black rounded-lg transition-all duration-150 dark:text-white",
        hasPadding && "px-6 sm:px-20 py-12",
        className,
        height ? height : "h-fit",
        width ? width : "w-[300px] sm:w-[500px]"
      )}
    >
      {children}
    </div>
  );
};

export default Card;
