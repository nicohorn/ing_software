import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { CustomUserType } from "./types/next-auth";

// This is the middleware function that runs before the API route handler
export async function middleware(req: NextRequest) {
  const token = await getToken({ req }); // Get the token from the request
  const user = token?.user as Omit<CustomUserType, "_id"> // Extract the user object from the token, omitting the "_id" property


  if (!token) {
    // If there is no token (user is not authenticated)
    if (req.nextUrl.pathname.includes("account")) {
      // If the request URL includes "/account". As they are not authenticated, they'll be redirected to the homepage.
      return NextResponse.redirect(process.env.NEXTAUTH_URL!)
    }
  } else {
    // If there is a token (user is authenticated)
    if (req.nextUrl.pathname.includes("dashboard") && user.role !== "admin") {
      // If the request URL includes "/dashboard" and the user's role is not "admin". If they're not an admin, they'll be redirected to the home page.
      return NextResponse.redirect(process.env.NEXTAUTH_URL!)
    }
  }


  // If none of the above conditions are met, continue to the API route handler
  return NextResponse.next();
}