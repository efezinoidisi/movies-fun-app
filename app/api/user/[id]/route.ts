import { NextResponse, NextRequest } from 'next/server';
import { connectDb } from '@/lib/db';
import User from '@/models/user';

export async function PUT(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const { email, username } = await req.json();
  try {
    await connectDb();
    await User.findOneAndUpdate({ _id: id }, { email, username });
    return NextResponse.json({ message: 'update sucess!' }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'error occurred while updating the user' },
      { status: 404 }
    );
  }
}
