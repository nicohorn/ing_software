import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// This is the middleware function that runs before the API route handler
export async function middleware(req) {
  const token = await getToken({ req }); // Get the token from the request
  const user = token?.user



  //Let api routes that are needed without authentication be free for everyone.
  if (req.nextUrl.pathname.includes("forgot_password") || req.nextUrl.pathname.includes("recover_password") || req.nextUrl.pathname.includes("auth") || req.nextUrl.pathname.includes("email") || req.nextUrl.pathname.includes("account_verification") || req.nextUrl.pathname.includes("token_verification") || req.nextUrl.pathname.startsWith("/api/user")) {

    return NextResponse.next();
  }

  if (!token) {
    // If there is no token (user is not authenticated)
    if (req.nextUrl.pathname.includes("account")) {
      // If the request URL includes "/account". As they are not authenticated, they'll be redirected to the homepage.
      return NextResponse.redirect(new URL("/", process.env.NEXTAUTH_URL))
    }
    //Protect api routes
    if (req.nextUrl.pathname.includes("api")) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  } else {
    // If there is a token (user is authenticated)
    if (req.nextUrl.pathname.includes("dashboard") && user.role !== "admin") {
      // If the request URL includes "/dashboard" and the user's role is not "admin". If they're not an admin, they'll be redirected to the home page.
      return NextResponse.redirect(new URL("/", process.env.NEXTAUTH_URL))
    }

  }


  // If none of the above conditions are met, continue to the API route handler
  return NextResponse.next();
}


