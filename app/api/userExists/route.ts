import { connectDb } from '@/lib/db';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    await connectDb();
    const { email } = await request.json();
    const user = await User.findOne({ email }).select('_id');
    console.log(user);
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ user: null });
  }
}
