import { API_BASE_URL, OPTIONS } from "@/constants/data";
import toast from "react-hot-toast";

export async function fetchList(endpoint: string) {
  const query = `${
    endpoint.includes("?") ? "&" : "?"
  }language=en-US&sort_by=popularity.desc`;
  const res = await fetch(`${API_BASE_URL}${endpoint}${query}`, {
    headers: OPTIONS,
  });

  if (!res.ok) throw new Error("An error occurred");
  const data = await res.json();
  return data;
}

export async function fetchClientList(endpoint: string, page: number = 1) {
  try {
    const res = await fetch(
      `${API_BASE_URL}${endpoint}${endpoint.includes("?") ? "&" : "?"}api_key=${
        process.env.NEXT_PUBLIC_API_KEY
      }&page=${page}&language=en-US&sort_by=popularity.desc`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    toast.error("An unknown error occurred!");
  }
}
