/**
 * Sends an HTTP request to the specified URL with the given data
 * @param data - The data to send (for POST requests)
 * @param url - The URL to send the request to
 * @param baseUrl - The base URL to use for the request
 * @param method - The HTTP method to use (GET or POST)
 * @returns The response from the request
 */
const httpRequest = async <T>({
  data,
  url,
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  method = "POST",
}: {
  data?: T;
  url: string;
  baseUrl?: string;
  method?: "GET" | "POST" | "DELETE";
}) => {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Only include body for POST requests
  if (method === "POST" && data) {
    options.body = JSON.stringify(data);
  }

  const req = await fetch(`${baseUrl}/${url}`, options);
  const response = await req.json();

  if (response) {
    return response;
  }
};

export default httpRequest;
