/**
 * Sends a POST request to the specified URL with the given data
 * @param data - The data to send
 * @param url - The URL to send the request to
 * @param baseUrl - The base URL to use for the request
 * @returns The response from the request
 */
const request = async <T>({
  data,
  url,
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
}: {
  data: T;
  url: string;
  baseUrl?: string;
}) => {
  const req = await fetch(`${baseUrl}/${url}`, {
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
