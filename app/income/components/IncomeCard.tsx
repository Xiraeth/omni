const IncomeCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full py-4 px-8 flex justify-between items-center rounded-md shadow-md border-2 border-slate-400/30 bg-white/60 text-black hover:bg-white/80 transition-all duration-200 dark:bg-dark/30 dark:bg-slate-800 dark:hover:bg-slate-900 dark:text-light dark:border-slate-700/50">
      {children}
    </div>
  );
};

export default IncomeCard;
