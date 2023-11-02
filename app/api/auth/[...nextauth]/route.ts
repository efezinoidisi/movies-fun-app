import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/models/user';
import { connectDb } from '@/lib/db';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials: any) {
        const { email, password } = credentials;
        try {
          await connectDb();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const isValid = bcrypt.compareSync(password, user.password);
          if (!isValid) {
            return null;
          }
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // async jwt({ token, user }) {
    //   return { ...token, ...user };
    // },
    async session({ session, user, token }) {
      // if (session.user) {
      //   session.user.id = token?._doc?._id;
      //   session.user.username = token?._doc.username;
      // }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
