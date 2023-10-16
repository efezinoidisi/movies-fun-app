import { API_BASE_URL, OPTIONS } from '@/constants/data';
import { NextResponse, NextRequest } from 'next/server';
import { number } from 'yup';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');
  const page = searchParams.get('page');
  const searchEndpoint = `search/multi?query=${query}&include_adult=false&language=en-US&page=${page}`;

  try {
    const res = await fetch(`${API_BASE_URL}${searchEndpoint}`, {
      headers: OPTIONS,
    });

    if (!res.ok) throw new Error('failed to fetch');
    const body = await res.json();
    return NextResponse.json(
      { message: 'success', data: body, page: Number(page) },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'error occurred' }, { status: 404 });
  }
}
