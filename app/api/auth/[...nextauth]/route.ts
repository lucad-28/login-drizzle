import NextAuth, { Awaitable, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/app/libs/db/db";
import bcrypt from "bcrypt";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "john.smith",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "******",
        },
      },
      async authorize(credentials: Record<string, string> | undefined, req) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        console.log(credentials);
        if (!username || !password) {
          throw new Error("Missing username or password");
        }

        const userFound = await db.query.users.findFirst({
          where: (user, { eq }) => eq(user.username, username),
        });

        if (!userFound) {
          throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          userFound.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }
        return {
          id: userFound.id,
          username: userFound.username,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
};

const auth = NextAuth(authOptions);

export { auth as GET, auth as POST };
