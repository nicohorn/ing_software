"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Notification } from "@/app/components/Notification";

// Function to create a new user
async function createNewUser({ email, password }) {
  const res = await fetch("/api/user", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ email, password }),
  });
  return res;
}

export default function SignUpForm() {
  // State variables for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  // State variables
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showVerification, setShowVerification] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const router = useRouter();

  // Function to handle email verification
  const handleVerification = async () => {
    const res = await fetch("/api/user/verify_email", {
      method: "PATCH",
      mode: "cors",
      body: JSON.stringify({ email, code: verificationCode }),
    });

    if (res.status === 200) {
      setIsVerified(true);
      new Notification().renderNotification({
        type: "success",
        title: "Verified email",
        description: "You're all set! Your email has been verified",
        seconds: 5,
      });
    } else {
      new Notification().renderNotification({
        type: "error",
        title: "Couldn't verify email",
        description: "Invalid code, please try again.",
        seconds: 5,
      });
    }
  };

  // Function to handle sign up form submission
  const handleSignUp = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== password2) {
      setPasswordsMatch(false);
      setTimeout(() => {
        setPasswordsMatch(true);
      }, 8000);
      return;
    }

    // Generate a random verification code
    const randomCode = (Math.random() + 1).toString(36).substring(7);
    const verificationCode = await fetch("/api/email", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ email: email, code: randomCode }),
    });

    if (verificationCode.ok) {
      setShowVerification(true);
    } else {
      new Notification().renderNotification({
        type: "error",
        title: "Error",
        description: "Failed to send verification code. Please try again.",
        seconds: 5,
      });
    }
  };

  // Function to handle account creation after email verification
  const handleCreateAccount = async () => {
    if (isVerified) {
      const newUser = await createNewUser({ email, password });

      if (newUser.ok) {
        router.push("/login");
      } else {
        new Notification().renderNotification({
          type: "error",
          title: "Error",
          description: "Failed to create account. Please try again.",
          seconds: 5,
        });
      }
    } else {
      new Notification().renderNotification({
        type: "error",
        title: "Error",
        description: "Please verify your email before creating an account.",
        seconds: 5,
      });
    }
  };

  return (
    <div>
      <h1 className="font-bold text-2xl ml-2 mb-2">Sign up</h1>
      <div className="md:max-w-96 w-[95vw] bg-primary rounded-lg shadow-lg p-6">
        <div className="text-black flex flex-col gap-4">
          {!showVerification ? (
            // Sign up form
            <form onSubmit={handleSignUp} className="flex flex-col gap-3">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-gray-300 border rounded-md px-3 py-2"
                type="text"
                placeholder="Email"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-300 border rounded-md px-3 py-2"
                type="password"
                placeholder="Password"
              />
              <input
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="border-gray-300 border rounded-md px-3 py-2"
                type="password"
                placeholder="Repeat password"
              />
              <button
                className="bg-green-500 text-white rounded-md py-2 font-semibold shadow-md"
                type="submit"
              >
                Sign up
              </button>
              {!passwordsMatch && (
                <p className="animate-pulse">Passwords don&apos;t match</p>
              )}
            </form>
          ) : (
            // Email verification form
            <div className="flex flex-col gap-2">
              <p className="text-xs text-white">Verify email</p>
              <input
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="border-gray-300 border rounded-md px-3 py-2 text-sm"
                type="text"
                placeholder="Email code"
              />
              <button
                onClick={handleVerification}
                className="bg-gray-200 text-black px-3 py-1 rounded-md shadow-md w-full"
              >
                Verify
              </button>
              {isVerified && (
                <button
                  onClick={handleCreateAccount}
                  className="bg-green-500 text-white rounded-md py-2 font-semibold shadow-md"
                >
                  Create Account
                </button>
              )}
            </div>
          )}
          <Link href="/login" className="text-xs ml-1 text-white">
            Already have an account? Log in here.
          </Link>
        </div>
      </div>
    </div>
  );
}

/* 
The useState hook is used to manage the state of form inputs (email, password, password2, verificationCode) instead of using refs.

The input fields are controlled components, with their values tied to the corresponding state variables and updated using the onChange event.

The handleCreateAccount function now uses the email and password state variables to create the new user account.
*/
