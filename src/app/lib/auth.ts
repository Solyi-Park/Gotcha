import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import CredentialsProvider from "next-auth/providers/credentials";
import { addUser } from "@/services/user";

export const authOptions: NextAuthOptions = {
  providers: [
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     username: { label: "Username", type: "text" },
    //     email: {
    //       label: "Email",
    //       type: "email",
    //     },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     console.log("credentials", credentials);

    //     const user = await findUserByEmail(credentials.email); // 데이터베이스에서 사용자 찾기, 이후에 정의
    //     if (
    //       user &&
    //       (await verifyPassword(credentials.password, user.password))
    //     ) {
    //       return {
    //         id: user.id,
    //         email: user.email,
    //         name: user.name,
    //         image: "",
    //         username: user.email.split("@")[0],
    //       };
    //     } else {
    //       return null;
    //     }
    //   },
    // }),
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
      console.log("id", id);
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
  },
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/signup",
  },
};
