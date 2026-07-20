import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyPassword } from "./password";
import { UserRepository } from "../repository/UserRepository";

const users = new UserRepository();
export const {
    handlers,
    signIn,
    signOut,
    auth,
} = NextAuth({

    session: {
        strategy: "jwt",
    },

    providers: [

        Credentials({

            credentials: {

                username: {
                    label: "Username",
                    type: "text",
                },

                password: {
                    label: "Password",
                    type: "password",
                },

            },

            async authorize(credentials) {

                if (
                    !credentials?.username ||
                    !credentials?.password
                ) {
                    return null;
                }

                const user =
                    await users.getByUsername(
                        credentials.username as string
                    );

                if (!user)
                    return null;

                const valid =
                    await verifyPassword(
                        credentials.password as string,
                        user.passwordHash
                    );

                if (!valid)
                    return null;

                if (!user.isActive)
                    return null;

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

                token.id = user.id;

                token.username = (user as any).username;
                token.fullName = user.name;
                token.role = (user as any).role;

            }

            return token;

        },

        async session({ session, token }) {

            (session.user as any).id = token.id;

            (session.user as any).username = token.username;
            (session.user as any).fullName = token.fullName;
            (session.user as any).role = token.role;

            return session;

        },

    },

});