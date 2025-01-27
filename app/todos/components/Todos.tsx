const Todos = () => {
  const todaysDate = new Date();
  const formattedDate = Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
  }).format(todaysDate);

  return (
    <div className="w-full flex font-montserrat h-screen">
      <div className="leftPart w-[300px] bg-yellow-400 flex flex-col justify-center items-center">
        <p className="text-xl font-bold pt-8">Categories</p>
        <p>Categories</p>
      </div>

      <div className="centerPart grow bg-orange-400 flex flex-col justify-center items-center">
        <p className="text-xl font-bold">Display and add todos</p>
      </div>

      <div className="rightPart w-[500px] bg-red-400 flex flex-col justify-center items-center">
        <p className="text-xl font-bold">{formattedDate}</p>
      </div>
    </div>
  );
};

export default Todos;
