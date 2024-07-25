import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import CredentialsProvider from "next-auth/providers/credentials";
import { addUser, findUserByEmail } from "@/services/user";
import bcrypt from "bcrypt";

async function verifyPassword(plainPassword: string, hashedPassword: string) {
  const isValid = await bcrypt.compare(plainPassword, hashedPassword);
  return isValid;
}
export async function hashPassword(plainPassword: string) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
}

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

        const user = await findUserByEmail(email);
        if (!user) return null;

        const verifyPw = await verifyPassword(password, user.password);
        if (!verifyPw) return null;
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: null,
          username: user.email.split("@")[0],
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
    async jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          id: user.id,
          username: `user_${user.id.slice(0, 8)}`,
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
          username: user.email
            ? user.email.split("@")[0] || ""
            : (token.username as string),
          id: token.id as string,
        };
      }
      return session;
    },
    async signIn({ user: { id, name, email, image } }) {
      if (!id) {
        return false;
      }
      const userData = {
        id,
        email: email || "",
        username: email ? email.split("@")[0] || "" : `user_${id.slice(0, 8)}`,
        name: name || "",
        image: image || "",
      };
      addUser(userData);
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
