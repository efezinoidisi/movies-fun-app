import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import Cryptr from 'cryptr';
import { connectDb } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { password, email, token } = await req.json();
    // decrypt email
    const crypt = new Cryptr(process.env.SECRET_KEY as string);

    const decryptedEmail = crypt.decrypt(email);

    await connectDb();
    const user = await User.findOne({
      email: decryptedEmail,
      reset_token: token,
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid token' },
        {
          status: 404,
        }
      );
    }

    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);
    user.reset_token = null;
    await user.save();

    return NextResponse.json(
      { message: 'Password changed successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'An error occured' }, { status: 500 });
  }
}
