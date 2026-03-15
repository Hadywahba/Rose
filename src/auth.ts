import { LoginResponse } from '@/lib/types/auth';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { JSON_HEADER } from '@/lib/constants/api.constant';

export const authOption: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
        rememberMe: {},
      },

      authorize: async (credentials) => {
        const response = await fetch(`${process.env.API_URL}/auth/signin`, {
          method: 'POST',
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: {
            ...JSON_HEADER,
          },
        });

        const payload: ApiResponse<LoginResponse> = await response.json();

        if ('error' in payload) {
          throw new Error(payload.error);
        }

        return {
          id: payload.user._id,
          user: payload.user,
          accessToken: payload.token,
          rememberMe: credentials?.rememberMe === 'true',
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7, // default 7 days
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.accessToken = user.accessToken;
        token.user = user.user;
        token.rememberMe = user.rememberMe;
        if (!user.rememberMe) {
          token.exp = Math.floor(Date.now() / 1000) + 60 * 5; // 5 minutes
        }
      }

      return token;
    },

    session: ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
  //  remeber me cookie
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
  },
};
