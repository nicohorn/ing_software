"use client";
import React from "react";
import { Notification } from "@/app/components/Notification";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const router = useRouter();

  const handleSignUp = async () => {
    // Send a POST request to the /api/token_verification endpoint to verify the token
    const tokenVerified = await fetch("/api/token_verification", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ token: params.token }),
    });

    // Parse the response as JSON
    const result = await tokenVerified.json();

    // If the token is valid
    if (result.valid === true) {
      // Send a POST request to the /api/user endpoint to create the user
      const res = await fetch("/api/user", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          email: result.data.email,
          password: result.data.password,
        }),
      });

      // Parse the response as JSON
      const userCreated = await res.json();

      // If the user was successfully created
      if (userCreated.status === 200) {
        // Display a success notification
        new Notification().renderNotification({
          title: "User created",
          description: "The user was successfully created",
          type: "success",
          seconds: 7,
        });

        // Redirect to the login page after 7 seconds
        setTimeout(() => {
          router.push("/login");
        }, 7000);
      } else {
        // Display an error notification if there was an error creating the user
        new Notification().renderNotification({
          title: "Error creating user",
          description: "There was an error creating the user. Try again.",
          type: "error",
          seconds: 7,
        });

        // Redirect to the signup page after 7 seconds
        setTimeout(() => {
          router.push("/signup");
        }, 7000);
      }
    } else {
      // Display an error notification if the token is invalid
      new Notification().renderNotification({
        title: "Token invalid",
        description: "The verification link is invalid.",
        type: "error",
        seconds: 7,
      });

      // Redirect to the signup page after 7 seconds
      setTimeout(() => {
        router.push("/signup");
      }, 7000);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center gap-4">
      <p className="text-xs">
        Click on the button below to complete your registration!
      </p>
      <button
        className="bg-primary rounded-lg p-2 shadow-lg"
        onClick={handleSignUp}
      >
        Complete sign up
      </button>
    </div>
  );
}
