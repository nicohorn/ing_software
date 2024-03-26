import NextAuth from "next-auth";
import { authOptions } from "./authOptions";

//With Next 14 the authOptions must be defined outside this route file, otherwise, it won't work.

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };