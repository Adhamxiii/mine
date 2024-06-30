import { type GoogleProfile } from "./../node_modules/next-auth/providers/google.d";
import { type AuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    Google({
      profile(profile: GoogleProfile) {
        return {
          ...profile,
          id: profile.sub.toString(),
          role: profile.email === process.env.ADMIN_ACCOUNT! ? "admin" : "user",
        };
      },
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
      }

      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    //     signOut: "/auth/signout",
    error: "/auth/error",
    //     verifyRequest: "/auth/verify-request",
    //     newUser: "/auth/new-user",
  },
};
