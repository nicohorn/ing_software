"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
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
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-gray-300 border rounded-md px-3 py-2 bg-transparent text-black/90 bg-white placeholder:text-black/50"
              type="text"
              placeholder="Email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-gray-300 border rounded-md px-3 py-2 bg-transparent text-black/90 bg-white placeholder:text-black/50"
              type="password"
              placeholder="Password"
            />
            <button
              className="bg-green-500 text-white rounded-md py-2 font-semibold shadow-md"
              type="submit"
            >
              {loading ? <LoadingSpinner /> : "Log in"}
            </button>
            {invalidCredentials && (
              <p className="animate-pulse">Invalid credentials, try again</p>
            )}
          </form>
          <Link href="/signup" className="text-xs ml-1 text-white">
            Do not have an account? Create one here.
          </Link>
        </div>
      </div>
    </div>
  );
}

const LoadingSpinner = () => (
  <div className="flex items-center justify-center">
    <div
      className="w-4 h-4 border-2 border-white rounded-full animate-spin"
      style={{ borderTopColor: "transparent" }}
    />
  </div>
);
