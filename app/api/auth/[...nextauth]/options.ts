import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import User from "@/models/user";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/connectToDb";

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET is not defined");
}

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Email",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          throw new Error("Email is required");
        }

        if (!credentials?.password) {
          throw new Error("Password is required");
        }

        try {
          // Connect to database
          await dbConnect();

          // Find user by email
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("No user found with this email");
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          // Return user object without password
          return {
            id: user._id.toString(),
            email: user.email,
            username: user.username,
            createdAt: user.createdAt,
          };
        } catch (error) {
          // Log the error for debugging but don't expose details to client
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
          throw new Error(errorMessage);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  // Add session configuration
  session: {
    strategy: "jwt",
  },
  // Add callbacks for JWT and Session handling
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    jwt({ token, user, profile, account, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.email = user.email as string;

        // Set username based on the authentication method
        if (account?.provider === "github") {
          token.username = profile?.login as string;
        } else {
          // For credentials provider, use the username from user object
          token.username = user.username as string;
        }
      }
      if (trigger === "update" && session?.user?.username) {
        token.username = session?.user?.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.username = token.username as string;
      }
      return session;
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24, // 1 day
  },
};
