import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req }); // Get the token from the request
  const user = token?.user;

  if (req.nextUrl.pathname.includes("api")) {
    // If the request URL starts with "/api"
    if (
      req.nextUrl.includes("auth") ||
      req.nextUrl.includes("recover_password")
    ) {
      // If the request URL is "/api/auth" or "/api/recover_password"
      // Allow access without authentication
      return NextResponse.next();
    }
    else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  if (!token) {
    // If there is no token (user is not authenticated)
    // Return an unauthorized response
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  else {
    if (!token) {
      // If there is no token (user is not authenticated)
      if (req.nextUrl.pathname.includes("account")) {
        // If the request URL includes "/account"
        // As they are not authenticated, they'll be redirected to the homepage
        return NextResponse.redirect(process.env.NEXTAUTH_URL);
      }
    } else {
      // If there is a token (user is authenticated)
      if (req.nextUrl.pathname.includes("dashboard") && user.role !== "admin") {
        // If the request URL includes "/dashboard" and the user's role is not "admin"
        // If they're not an admin, they'll be redirected to the home page
        return NextResponse.redirect(process.env.NEXTAUTH_URL);
      }
    }
  }

  // If none of the above conditions are met, continue to the API route handler
  return NextResponse.next();
}


/*
This middleware function is responsible for protecting certain routes based on the user's authentication status and role. It runs before the API route handler and performs the following checks:

Protection of the /api route:

If the request URL starts with "/api", the middleware checks if it is either "/api/auth" or "/api/recover_password".

If the request URL is "/api/auth" or "/api/recover_password", access is allowed without authentication.

If the request URL starts with "/api" but is not "/api/auth" or "/api/recover_password", the middleware checks if the user is authenticated by verifying the presence of a token.

If there is no token (user is not authenticated), an unauthorized response with a status code of 401 is returned.

Protection of the "/account" route:

If the request URL includes "/account" and the user is not authenticated (no token), the middleware redirects the user to the homepage.

Protection of the "/dashboard" route:

If the request URL includes "/dashboard" and the user is authenticated (token exists), the middleware checks the user's role.

If the user's role is not "admin", the middleware redirects the user to the homepage.

If none of the above conditions are met, the middleware allows the request to proceed to the API route handler.
The middleware uses the getToken function from the next-auth/jwt library to retrieve the authentication token from the request. It then checks the presence and contents of the token to determine the user's authentication status and role.

The NextResponse class from next/server is used to send appropriate responses, such as redirects or unauthorized responses, based on the conditions met in the middleware.

The middleware assumes the following:

The authentication token contains a user object with a role property.
The NEXTAUTH_URL environment variable is set to the URL of the Next.js application for redirects.
*/

