import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import React from "react";
import ForgotPasswordResetForm from "../components/ForgotPassword_ResetForm";

export default function Page({ params }) {
  const token = jwtDecode(params.token);
  const expirationTime = token.exp;
  const currentTimestamp = Math.floor(Date.now() / 1000);

  if (currentTimestamp < expirationTime) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-between">
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
          <h1 className="p-2 bg-primary rounded-md shadow-md">Token expired</h1>
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
