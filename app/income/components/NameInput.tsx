const NameInput = ({
  onChange,
  value,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}) => {
  return (
    <input
      className="outline-none bg-transparent w-full lg:w-11/12 border-b-[1px] border-b-black/50 dark:border-b-slate-400 px-4 py-2 transition-all duration-200 text-dark dark:text-light font-montserrat hover:border-b-slate-400/80 dark:hover:border-b-slate-500 focus:border-b-sky-400 dark:focus:border-b-amber-400"
      placeholder="Income name"
      onChange={onChange}
      value={value}
    />
  );
};

export default NameInput;
