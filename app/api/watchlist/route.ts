import { NextResponse, NextRequest } from 'next/server';
import { connectDb } from '@/lib/db';
import User from '@/models/user';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  const session = getServerSession(authOptions);

  await connectDb();
  const email = session?.user?.email;

  return NextResponse.json({ message: 'good' }, { status: 201 });
}
