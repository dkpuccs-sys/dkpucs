import type { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Admin",
      credentials: {
        password: { label: "Admin Password", type: "password" },
      },
      authorize: async (credentials) => {
        const adminPassword = process.env.ADMIN_PASSWORD

        if (!adminPassword) {
          throw new Error("ADMIN_PASSWORD is not set on the server.")
        }

        if (!credentials?.password || credentials.password !== adminPassword) {
          return null
        }

        return {
          id: "admin",
          name: "Admin",
          role: "admin",
        } as any
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        ;(token as any).role = (user as any).role || "user"
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        ;(session.user as any).role = (token as any).role
      }
      return session
    },
  },
}
