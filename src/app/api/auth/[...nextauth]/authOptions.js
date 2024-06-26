import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/mongo_client";
import User from "@/models/User";
import dbConnect from "@/mongoose";
import { verifyHashBcrypt } from "@/utils/hash";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await dbConnect();
          const user = await User.findOne({ email: credentials?.email });

          if (!user) {
            // User not found, return null to display a notification
            return null;
          }

          const passwordCheck = await verifyHashBcrypt(
            credentials?.password,
            user.password
          );

          if (passwordCheck) {
            // Successful login, return the user object
            return user;
          } else {
            // Incorrect password, return null to display a notification
            return null;
          }
        } catch (error) {
          console.error("Error during sign-in:", error);
          // Return null to display a notification
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user || !user.email) return false;
      return true;
    },
    async jwt({ token, user }) {
      // Check if the user object is available in the token
      // If the user object is available, add it to the token
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      const decodedUser = token.user;

      // Update the session.user object with the relevant properties
      session.user = {
        id: decodedUser._id.toString(), // Convert _id to a string
        name: decodedUser.name,
        lastname: decodedUser.lastname,
        email: decodedUser.email,
        emailVerified: decodedUser.emailVerified,
        role: decodedUser.role,
        // Here you can add any other properties you want to expose in the session object.
      };

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  //debug: process.env.NODE_ENV === "development",
};
