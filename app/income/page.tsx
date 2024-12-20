import { useUser } from "../context/UserContext";

const Income = () => {
  const { session } = useUser();

  return <div>Income</div>;
};

export default Income;
