import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string | unknown ;   // add id
    } & DefaultSession["user"];
    accessToken?: string;
  }

  interface User {
    id: string;
  }

  interface JWT {
    accessToken?: string;
  }
}
