import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db, { UserRole } from "@/lib/db";
import { getUserById } from "./data/user";

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole;
    } & DefaultSession["user"];
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    jwt: async ({ token }) => {
      if (!token.sub) return token;

      const user = await getUserById(token.sub);
      if (!user) return token;

      token.role = user.role;
      return token;
    },
    session: async ({ session, token }) => {
      console.log({ sessionToken: token });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    // signIn: async ({ user }) => {
    //   const existingUser = await getUserById(user.id);
      
    //   if (!existingUser || !existingUser.emailVerified) {
    //     return false;
    //   }
      
    //   return true;
    // }
  },
});
