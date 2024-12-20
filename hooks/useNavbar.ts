import { useSearchParams } from "next/navigation";

export const useNavbar = () => {
  const searchParams = useSearchParams();
  return searchParams.get("isNavbarOpen") === "true";
};
