"use client";
import React, { useState } from "react";
import { Notification } from "@/app/components/Notification";

export default function ForgotPasswordForm() {
  // State variable to store the email input value
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Display a notification to inform the user to check their email
    new Notification().renderNotification({
      type: "info",
      title: "Check your email",
      description:
        "If there's an account with that address, you'll receive an email with a link to reset your password.",
      seconds: 10,
    });

    // Send a POST request to the server with the email address
    const res = await fetch(`/api/user/forgot_password`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ email }),
    });

    // Handle the response from the server
    if ((res && res.status !== 200) || (res && res.error)) {
      setInvalidCredentials(true);
      setTimeout(() => {
        setInvalidCredentials(false);
      }, 8000);
    } else {
      console.log(res);
    }
  };

  return (
    <div>
      {/* Heading */}
      <h1 className="font-bold text-2xl ml-2 mb-2">Password recovery</h1>

      {/* Form container */}
      <div className="md:max-w-96 w-[95vw] bg-primary rounded-lg shadow-lg p-6">
        <p className="text-xs text-white mb-1">Enter your email</p>
        <div className="text-black flex flex-col gap-4">
          {/* Form */}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Email input field */}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-gray-300 border rounded-md px-3 py-2 bg-transparent text-black/90 bg-white placeholder:text-black/50"
              type="text"
              placeholder="Email"
            />

            {/* Submit button */}
            <button
              className="bg-green-500 text-white rounded-md py-2 font-semibold shadow-md"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
