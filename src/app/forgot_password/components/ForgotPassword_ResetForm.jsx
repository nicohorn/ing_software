"use client";
import React, { useState } from "react";
import { Notification } from "@/app/components/Notification";
import { useRouter } from "next/navigation";

export default function ForgotPasswordResetForm({ email, tokenFromUser }) {
  // State variable to store the email input value
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password length
    if (newPassword.length < 3) {
      new Notification().renderNotification({
        type: "error",
        title: "Invalid password",
        description: "Password must be at least 3 characters long.",
        seconds: 5,
      });
      return;
    }

    // Check if passwords match
    if (newPassword !== newPasswordRepeat) {
      new Notification().renderNotification({
        type: "error",
        title: "Password mismatch",
        description: "Passwords do not match.",
        seconds: 5,
      });
      return;
    }

    // Display a notification to inform the user that the password was updated
    // Send a POST request to the server with the email address
    const res = await fetch(`/api/recover_password`, {
      method: "PATCH",
      mode: "cors",
      body: JSON.stringify({ email, newPassword, tokenFromUser }),
    });

    const result = await res.json();
    if (result.status === 200) {
      new Notification().renderNotification({
        type: "success",
        title: "Password updated",
        description: "Your password was successfully updated.",
        seconds: 3,
      });
      //Redirect to login after 3 seconds of successfully changing the password.
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } else {
      new Notification().renderNotification({
        type: "error",
        title: "Error updating password",
        description: "Couldn't update your password. Try again.",
        seconds: 10,
      });
    }
  };

  return (
    <div>
      {/* Heading */}
      <h1 className="font-bold text-2xl ml-2 mb-2">Reset password</h1>
      {/* Form container */}
      <div className="md:max-w-96 w-[95vw] bg-primary rounded-lg shadow-lg p-6">
        <p className="text-xs text-white mb-1">Enter a new password</p>
        <div className="text-black flex flex-col gap-4">
          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Email input field */}
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border-gray-300 border rounded-md px-3 py-2 bg-transparent text-black/90 bg-white placeholder:text-black/50"
              type="password"
              placeholder="New password"
            />
            <input
              value={newPasswordRepeat}
              onChange={(e) => setNewPasswordRepeat(e.target.value)}
              className="border-gray-300 border rounded-md px-3 py-2 bg-transparent text-black/90 bg-white placeholder:text-black/50"
              type="password"
              placeholder="Repeat new password"
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
