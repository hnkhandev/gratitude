import { NextAuthOptions, Session } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";
import { WhopProvider } from "./whop-provider";

export const authConfig: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    WhopProvider({
      clientId: process.env.NEXT_PUBLIC_WHOP_CLIENT_ID!,
      clientSecret: process.env.WHOP_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id as string;
      return session;
    },
  },
  session: {
    strategy: "database",
  },
};
