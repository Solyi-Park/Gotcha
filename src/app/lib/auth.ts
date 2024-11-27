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
        name: { label: "Name", type: "name" },
      },
      async authorize(credentials) {
        const { email, password, name } = credentials!;
        // console.log("크레덴셜", credentials);

        const user = await findUser(email);

        if (!user) {
          const user = await addUser({
            email,
            password,
            name,
          });
          console.log("authorize-findUser", user);
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
          id: token.id as string,
          provider: token.provider as string,
        };
      }
      return session;
    },
    async signIn({ user: { id, email, name, image }, account }) {
      if (!id) {
        return false;
      }
      const existingUser = await findUser(email, id);

      if (!existingUser) {
        const userData = {
          email: email || null,
          name: name || "",
          image: image || null,
          provider: account?.provider as string,
          id,
        };

        await addUser(userData);
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
