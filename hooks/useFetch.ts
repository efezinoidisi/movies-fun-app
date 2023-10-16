'use client';

import { API_BASE_URL } from '@/constants/data';
import { useState, useEffect } from 'react';

export default function useFetch(endpoint: string) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  console.log('use fetch');
  useEffect(() => {
    getData();
  }, [endpoint]);
  const getData = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}${endpoint}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      console.log('res', res);
      const body = await res.json();

      if (res.ok) {
        setData(body);
      } else {
        setError(body);
      }
    } catch (error: any) {
      setError(error);
    }
  };

  return { data, error };
}
