
import { appConfig } from "@/config/config"
import { SIGN_IN } from "@/graphql/mutation/SING_IN"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
const isHttps = process.env.NEXTAUTH_URL?.startsWith("https://")

  const query = `
   mutation($email:String! , $password:String!){
    signIn(email: $email , password: $password){
      accessToken
      refreshToken
      userInfo{
        _id
        name
        createdAt
      }
    }
  }
  `
const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${appConfig.apiUrl}`, {
          method: "POST",
          body: JSON.stringify({
            query,
            variables: {
              email: credentials?.email,
              password: credentials?.password,
            },
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        const data = await res.json()
        if (res.ok) {
          return data
        } else {
          return null
        }
      },
    }),
  ],
  useSecureCookies: appConfig.enableSecureCookie,
  callbacks: {
    async jwt({ token, session, trigger, user }) {
      if (trigger === "update") {
        return { ...token, ...session.user }
      }

      return { ...token, ...user }
    },
    async session({ session, token }) {
      return {
        ...session,
        token,
      }
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 604800,
  },
  secret: appConfig.NextAuthSecret,
  pages: {
    signIn: "/auth/login",
  },
  cookies: {
    sessionToken: {
      name: `${isHttps ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: appConfig?.enableSecureCookie,
      },
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }