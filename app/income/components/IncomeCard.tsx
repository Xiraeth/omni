import clsx from "clsx";

const IncomeCard = ({
  children,
  hasBorder = false,
}: {
  children?: React.ReactNode;
  hasBorder?: boolean;
}) => {
  return (
    <div
      className={clsx(
        "w-full py-4 px-4 text-center sm:text-start sm:px-8 flex sm:flex-row flex-col gap-2 sm:gap-0 justify-between items-center rounded-md shadow-md bg-white/60 text-black hover:bg-white/80 transition-all duration-200 dark:bg-dark/30 dark:bg-slate-800 dark:hover:bg-slate-900 dark:text-light ",
        {
          "border-[1px] border-sky-400 dark:border-amber-400": hasBorder,
          "border-2 border-slate-400/30 dark:border-slate-700/50": !hasBorder,
        }
      )}
    >
      {children && children}
    </div>
  );
};

export default IncomeCard;
