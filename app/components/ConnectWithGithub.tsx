import Image from "next/image";
import githubDark from "@/public/github-mark.svg";
import githubWhite from "@/public/github-mark-white.svg";
import { useTheme } from "../context/ThemeContext";

const ConnectWithGithub = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  const { theme } = useTheme();
  return (
    <button
      className="w-full flex items-center justify-center border-[1px] border-black/20 rounded-md px-4 py-2 shadow-sm shadow-black/10 hover:bg-zinc-100 transition-all duration-100 font-roboto font-bold mb-2 active:bg-zinc-200/50 text-sm sm:text-base dark:border-white/50 dark:hover:bg-slate-700"
      onClick={onClick}
    >
      <div className="flex items-center justify-between gap-2 w-[160px] sm:w-[180px]">
        <Image
          src={theme === "dark" ? githubWhite : githubDark}
          alt="Github"
          width={20}
          height={20}
          priority
        />
        <span>{text}</span>
      </div>
    </button>
  );
};

export default ConnectWithGithub;
