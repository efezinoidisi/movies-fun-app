import { API_BASE_URL, OPTIONS } from '@/constants/data';

export async function fetchList(endpoint: string) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: OPTIONS,
  });

  if (!res.ok) throw new Error('An error occurred');
  const data = await res.json();
  return data;
}
