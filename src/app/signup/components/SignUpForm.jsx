"use client";
import React, { useState } from "react";
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

  // State variables
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  // Function to handle sign up form submission
  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      new Notification().renderNotification({
        type: "info",
        title: "Invalid email",
        description: "Please enter a valid email address.",
        seconds: 5,
      });
      return;
    }

    // Validate password length
    if (password.length < 4) {
      new Notification().renderNotification({
        type: "info",
        title: "Password is too short",
        description: "Password must be at least 4 characters long.",
        seconds: 5,
      });
      return;
    }

    // Check if passwords don't match.
    if (password !== password2) {
      setPasswordsMatch(false);
      setTimeout(() => {
        setPasswordsMatch(true);
      }, 8000);
      return;
    }

    // Send the verification link to the user's email
    const res = await fetch("/api/email", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ email: email, password: password }),
    });

    const result = await res.json();

    if (result.status === 501) {
      new Notification().renderNotification({
        type: "error",
        title: "Error",
        description: "That email is already being used.",
        seconds: 5,
      });
    } else if (result.status === 200) {
      new Notification().renderNotification({
        type: "success",
        title: "Verification link sent",
        description:
          "Please check your email for the verification link. You can close this page.",
        seconds: 5,
      });
    } else {
      new Notification().renderNotification({
        type: "error",
        title: "Error",
        description: "Failed to send verification link. Please try again.",
        seconds: 5,
      });
    }
  };

  return (
    <div>
      <h1 className="font-bold text-2xl ml-2 mb-2">Sign up</h1>
      <div className="md:max-w-96 w-[95vw] bg-primary rounded-lg shadow-lg p-6">
        <div className="text-black flex flex-col gap-4">
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
