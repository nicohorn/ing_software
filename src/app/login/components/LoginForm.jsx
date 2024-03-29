"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Function to validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    } else {
      setEmailError("");
    }

    // Validate password
    if (password.trim() === "") {
      setPasswordError("Password cannot be empty");
      return;
    } else {
      setPasswordError("");
    }

    setLoading(true);

    // Sign in using Next Auth credentials provider
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    // Handle sign in response
    if ((res && res.status !== 200) || (res && res.error)) {
      setInvalidCredentials(true);
      setLoading(false);
      setTimeout(() => {
        setInvalidCredentials(false);
      }, 8000);
    } else {
      router.push("/account");
      router.refresh();
    }
  };

  return (
    <div>
      <h1 className="font-bold text-2xl ml-2 mb-2">Log in</h1>
      <div className="md:max-w-96 w-[95vw] bg-primary rounded-lg shadow-lg p-6">
        <div className="text-black flex flex-col gap-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Email input field */}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`border-gray-300 border rounded-md px-3 py-2 bg-transparent text-black/90 bg-white placeholder:text-black/50 ${
                emailError ? "text-gray-400" : ""
              }`}
              type="text"
              placeholder="Email"
            />
            {emailError && (
              <p className="text-gray-400 text-sm">{emailError}</p>
            )}

            {/* Password input field */}
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`border-gray-300 border rounded-md px-3 py-2 bg-transparent text-black/90 bg-white placeholder:text-black/50 ${
                passwordError ? "border-red-500" : ""
              }`}
              type="password"
              placeholder="Password"
            />
            {passwordError && (
              <p className="text-gray-400 text-sm">{passwordError}</p>
            )}
            {/* Link to password recovery page */}
            <Link href="/signup" className="text-xs ml-1 text-white">
              Forgot password? Click here.
            </Link>

            {/* Submit button */}
            <button
              className="bg-green-500 text-white rounded-md py-2 font-semibold shadow-md"
              type="submit"
            >
              {loading ? <LoadingSpinner /> : "Log in"}
            </button>
            {invalidCredentials && (
              <p className="animate-pulse text-gray-400">
                Invalid credentials, try again
              </p>
            )}
          </form>
        </div>
      </div>
      {/* Link to signup page */}
      <Link href="/signup" className="text-xs ml-1 text-white">
        Don&apos;t have an account? Create one here.
      </Link>
    </div>
  );
}

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center">
    <div
      className="w-4 h-4 border-2 border-white rounded-full animate-spin"
      style={{ borderTopColor: "transparent" }}
    />
  </div>
);
