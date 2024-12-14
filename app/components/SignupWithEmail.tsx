import Image from "next/image";
import google from "@/public/google.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const SignupWithEmail = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center border-[1px] border-black/20 rounded-md py-2 shadow-sm shadow-black/10  transition-all duration-200 font-roboto font-bold mb-2 text-sm sm:text-base bg-dark text-white hover:bg-slate-700/90 active:bg-slate-700/95"
    >
      <div className="flex items-center justify-between w-[160px] sm:w-[180px]">
        <FontAwesomeIcon icon={faEnvelope} width={20} height={20} />
        <span className="relative right-3">Sign up with Email</span>
      </div>
    </button>
  );
};

export default SignupWithEmail;
