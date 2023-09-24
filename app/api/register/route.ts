import { NextResponse, NextRequest } from 'next/server';
import { connectDb } from '@/lib/db';
import User from '@/models/user';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { email, password, username } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectDb();
    await User.create({ username, email, password: hashedPassword });
    return NextResponse.json({ message: 'signup sucess!' }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'error occurred while registering the user' },
      { status: 404 }
    );
  }
}
