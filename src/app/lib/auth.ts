import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import CredentialsProvider from "next-auth/providers/credentials";
import { addUser, findUser } from "@/services/user";
import { verifyPassword } from "@/utils/password";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials!;

        const user = await findUser(email);

        console.log("authorize-findUser", user);
        if (!user || !user.password) return null;
        if (!user !== null) {
        }
        const verifyPw = await verifyPassword(password, user.password);
        if (!verifyPw) return null;
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: null,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || "",
      clientSecret: process.env.NAVER_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token = {
          ...token,
          id: user.id,
          provider: account?.provider,
        };
      }
      return token;
    },
    async session({ session, token }) {
      const user = session?.user;

      if (user) {
        session.user = {
          ...user,
          email: user.email || "",
          // id: token.id as string,
          providerId: token.id as string,
          provider: token.provider as string,
        };
      }
      return session;
    },
    async signIn({ user, account }) {
      if (!user.id) {
        return false;
      }
      const existingUser = await findUser(
        user.email,
        account?.providerAccountId
      );

      if (!existingUser) {
        const userData = {
          email: user.email || null,
          name: user.name || "",
          image: user.image || null,
          provider: account?.provider as string,
          providerId: account?.providerAccountId as string,
        };
        const newUser = await addUser(userData);
        console.log("newUser", newUser);
        if (newUser) {
          user.id = newUser.id;
        }
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/signup",
  },
};
