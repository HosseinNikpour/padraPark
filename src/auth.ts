import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { UserRepository } from "@/modules/auth/repository/UserRepository";
import { verifyPassword } from "@/modules/auth/lib/password";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials.username || !credentials.password) {
          return null;
        }

        const user = await new UserRepository().getByUsername(
          credentials.username as string
        );

        if (!user) {
          return null;
        }

        const valid = await verifyPassword(
          credentials.password as string,
          user.passwordHash
        );

        if (!valid) {
          return null;
        }

        return {
          id: user.id.toString(),
          name: user.fullName,
          username: user.username,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.username = (user as any).username;
      }

      return token;
    },

    async session({ session, token }) {
      (session.user as any).role = token.role;
      (session.user as any).username = token.username;

      return session;
    },
  },
});