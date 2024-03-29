"use client";
import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { NameEdit } from "./NameEdit";
import { LogoutButton } from "./LogoutButton";
import { PasswordChange } from "./PasswordChange";
import { SessionProvider } from "next-auth/react";

const UserDetails = ({ user }) => {
  const { data: session } = useSession();

  // If the session is not available, show a loading spinner
  if (!session) {
    return (
      <div className="flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-white rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center flex-col gap-2 w-fit mx-auto">
      <h1 className="font-bold text-2xl self-start ml-2">Account details</h1>
      <div className="md:max-w-96 w-[95vw] bg-primary rounded-lg shadow-lg p-6">
        <div className="text-white flex flex-col gap-4">
          {/* User email */}
          <div>
            <p className="text-xs">Email</p>
            <div className="font-bold">{user?.email}</div>
          </div>
          <hr />

          {/* Name edit component */}
          <NameEdit user={user} />
          <hr />
          {/* User role */}
          <div>
            <p className="text-xs">Role</p>
            <div className="font-bold">{user?.role}</div>
          </div>
        </div>
      </div>

      {/* Password change component */}
      <PasswordChange user={user} />

      {/* Logout button component */}
      <LogoutButton />
    </div>
  );
};

export default function UserDetailsComponent({ user }) {
  return (
    // Wrap the UserDetails component with SessionProvider
    <SessionProvider>
      {/* Render UserDetails component if user is available */}
      {user && <UserDetails user={user} />}
    </SessionProvider>
  );
}
