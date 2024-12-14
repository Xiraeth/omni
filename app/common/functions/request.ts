const request = async <T>({ data, url }: { data: T; url: string }) => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const response = await req.json();

  return response;
};

export default request;
