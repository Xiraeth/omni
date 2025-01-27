"use client";

import OpenNavbarButton from "../components/OpenNavbarButton";
import { useUser } from "../context/UserContext";

const TodosPage = () => {
  const { session } = useUser();
  const user = session?.user;

  if (!user) {
    return <div>Please log in to continue</div>;
  }

  return (
    <div>
      <OpenNavbarButton />
    </div>
  );
};

export default TodosPage;
