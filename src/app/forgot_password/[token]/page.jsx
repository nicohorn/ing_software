import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import React from "react";
import ForgotPasswordResetForm from "../components/ForgotPassword_ResetForm";

export default function Page({ params }) {
  // Decode the token from the URL parameters
  const token = jwtDecode(params.token);

  // Extract the expiration time from the decoded token
  const expirationTime = token.exp;

  // Get the current timestamp
  const currentTimestamp = Math.floor(Date.now() / 1000);

  // Check if the current timestamp is less than the token's expiration time
  if (currentTimestamp < expirationTime) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-between">
        {/* Render the ForgotPasswordResetForm component */}
        <ForgotPasswordResetForm
          email={token.email}
          currentTimestamp={currentTimestamp}
          tokenExpirationTime={expirationTime}
          tokenFromUser={params.token}
        />
      </div>
    );
  } else {
    return (
      <div className="flex min-h-screen flex-col items-center justify-between">
        <div className="flex flex-col gap-2 items-center">
          {/* Display a message indicating that the token has expired */}
          <h1 className="p-2 bg-primary rounded-md shadow-md">Token expired</h1>

          {/* Render a link to the forgot password page */}
          <Link
            className="text-white text-xs hover:underline"
            href="/forgot_password"
          >
            Recover password
          </Link>
        </div>
      </div>
    );
  }
}
