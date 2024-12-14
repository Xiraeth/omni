"use client";
import LinkButton from "../components/LinkButton";
import { changeUrlParams } from "../common/functions/changeParams";
const Finances = () => {
  return (
    <div className="flex flex-col items-center justify-center text-5xl fixed top-16 right-4 drop-shadow-lg shadow-black">
      <LinkButton text="Home" href="/" />
      <button
        onClick={() =>
          changeUrlParams({ params: "isNavbarOpen", value: "true" })
        }
      >
        Open
      </button>
    </div>
  );
};

export default Finances;
