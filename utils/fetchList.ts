import { API_BASE_URL, OPTIONS } from '@/constants/data';

export async function fetchList(endpoint: string) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: OPTIONS,
  });

  if (!res.ok) throw new Error('An error occurred');
  const data = await res.json();
  return data;
}

export async function fetchClientList(
  endpoint: string,
  page: number = 1,
  signal?: AbortSignal
) {
  try {
    const res = await fetch(
      `${API_BASE_URL}${endpoint}?api-key=${process.env.NEXT_PUBLIC_API_KEY}page=${page}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
