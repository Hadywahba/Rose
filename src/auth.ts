import { LoginResponse } from '@/lib/types/auth';
import { NextAuthOptions} from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { JSON_HEADER } from '@/lib/constants/api.constant';

export const authOption: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
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
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.accessToken = user.accessToken;
        token.user = user.user;
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
