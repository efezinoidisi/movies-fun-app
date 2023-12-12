import { NextResponse } from 'next/server';
import { connectDb } from '@/lib/db';
import User from '@/models/user';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'fail' }, { status: 400 });
  }
  await connectDb();
  const email = session.user.email;
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: 'fail' }, { status: 400 });
  }
  const favourites = user.favourites;
  const watchlist = user.watchlist;
  return NextResponse.json(
    {
      data: {
        favourites,
        watchlist,
      },
    },
    { status: 201 }
  );
}
