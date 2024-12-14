import Image from "next/image";
import google from "@/public/google.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const SignupWithEmail = () => {
  return (
    <button className="w-full flex items-center justify-center border-[1px] border-black/20 rounded-md py-2 shadow-sm shadow-black/10 hover:bg-zinc-100 transition-all duration-100 font-roboto font-bold mb-2 active:bg-zinc-200/50 text-sm sm:text-base">
      <div className="flex items-center justify-between w-[160px] sm:w-[180px]">
        <FontAwesomeIcon icon={faEnvelope} width={20} height={20} />
        <span className="relative right-3">Sign up with Email</span>
      </div>
    </button>
  );
};

export default SignupWithEmail;
