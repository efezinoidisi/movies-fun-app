import { connectDb } from '@/lib/db';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import Cryptr from 'cryptr';
import cryptoRandomString from 'crypto-random-string';
import { render } from '@react-email/render';
import ForgotPasswordEmail from 'templates/ForgotPassword';
import { sendEmail } from 'config/email';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    await connectDb();
    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json({ message: 'user not found' }, { status: 404 });

    // generate random string token
    const token = cryptoRandomString({
      length: 64,
      type: 'url-safe',
    });

    user.reset_token = token;
    await user.save();

    // encrypt user's email
    const crypt = new Cryptr(process.env.SECRET_KEY as string);

    const encryptedEmail = crypt.encrypt(email);
    const url = `${process.env.NEXTAUTH_URL}/reset-password/${encryptedEmail}?token=${token}`;
    const html = render(
      ForgotPasswordEmail({
        params: {
          name: user.username,
          url,
        },
      })
    );

    const msgId = await sendEmail(email, 'Reset Password', html);
    if (msgId) {
      return NextResponse.json(
        { message: 'Email sent successfully. Please check your email' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: 'Error sending email' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'An error occurred. Please try again!' },
      { status: 500 }
    );
  }
}
