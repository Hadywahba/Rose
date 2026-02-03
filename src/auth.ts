import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginResponse } from "./lib/types/auth";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // max عمر ممكن
  },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
        rememberMe: {},
      },

      authorize: async (credentials) => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/auth/signin`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        const payload: ApiResponse<LoginResponse> = await response.json();

      

        return {
          id: payload.user._id,
          name: payload.user.username,
          email: payload.user.email,
          accessToken: payload.token,
          user: payload.user,
          rememberMe: credentials?.rememberMe === 'true',
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.user = (user as any).user;
        token.rememberMe = (user as any).rememberMe;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user as any;
      session.accessToken = token.accessToken as string;
      return session;
    },
  },

//  remeber me cookie
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        // ❗ ما نحطش maxAge هنا
        // NextAuth هتحطها بس لو Remember Me = true
      },
    },
  },
};
