import NextAuth, { NextAuthOptions } from "next-auth";
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
      async authorize(credentials, req) {
        const userFound = await db.query.users.findFirst({
          where: (user, { eq }) => eq(user.username, credentials.username),
        });
        
        if (!userFound) {
          return null;
        }
        console.log(userFound);
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          userFound.password,
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: userFound.id,
          username: userFound.username,
        };
      },
    }),
  ],
};

const auth = NextAuth(authOptions);

export { auth as GET, auth as POST };
