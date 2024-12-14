const ConnectButton = ({ text }: { text: string }) => {
  return (
    <button
      type="submit"
      className="w-full flex items-center justify-center border-[1px] border-black/20 rounded-md py-2 shadow-sm shadow-black/10 transition-all duration-200 font-roboto font-bold text-sm sm:text-base bg-dark text-white hover:bg-slate-700/90 active:bg-slate-700/95 dark:bg-light dark:text-dark dark:hover:bg-zinc-300"
    >
      <div className="flex items-center justify-center text-center w-[160px] sm:w-[180px]">
        {text}
      </div>
    </button>
  );
};

export default ConnectButton;
