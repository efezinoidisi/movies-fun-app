import { NextResponse } from 'next/server';
import { connectDb } from '@/lib/db';
import User from '@/models/user';
import { getServerSession } from 'next-auth';
import authOptions from 'config/authOptions';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'unauthorized' }, { status: 401 });
  }
  await connectDb();
  const email = session?.user?.email;
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json(
      { message: 'user does not exist' },
      { status: 400 }
    );
  }
  const favorites = user.favorites;
  const watchlist = user.watchlist;
  return NextResponse.json(
    {
      favorites,
      watchlist,
    },
    { status: 201 }
  );
}
