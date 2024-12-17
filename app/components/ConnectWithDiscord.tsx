import Image from "next/image";
import discord from "@/public/discord.svg";

const ConnectWithDiscord = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <button
      className="w-full flex items-center justify-center border-[1px] border-black/20 rounded-md px-4 py-2 shadow-sm shadow-black/10 bg-discordBlue text-zinc-50 hover:bg-discordBlue/85 transition-all duration-200 font-roboto font-bold mb-2 active:bg-discordBlue/70 text-sm sm:text-base"
      onClick={onClick}
    >
      <div className="flex items-center justify-between gap-2 w-[160px] sm:w-[180px]">
        <Image src={discord} alt="Discord" width={20} height={20} priority />
        <span>{text}</span>
      </div>
    </button>
  );
};

export default ConnectWithDiscord;
