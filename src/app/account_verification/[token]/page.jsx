"use client";
import React from "react";
import { Notification } from "@/app/components/Notification";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      } else if (userCreated.status === 501) {
        new Notification().renderNotification({
          title: "Error creating user",
          description: "User with that email already exists.",
          type: "error",
          seconds: 7,
        });
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

  // Extract the expiration time from the decoded token
  const expirationTime = result.data.exp;

  // Get the current timestamp
  const currentTimestamp = Math.floor(Date.now() / 1000);
  if (currentTimestamp < expirationTime) {
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
  } else {
    return (
      <div className="flex min-h-screen flex-col items-center justify-between">
        <div className="flex flex-col gap-2 items-center">
          {/* Display a message indicating that the token has expired */}
          <h1 className="p-2 bg-primary rounded-md shadow-md">Token expired</h1>

          {/* Render a link to the forgot password page */}
          <Link className="text-white text-xs hover:underline" href="/signup">
            Create account
          </Link>
        </div>
      </div>
    );
  }
}
