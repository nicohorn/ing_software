"use client";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import React from "react";
import UserDetails from "./components/UserDetails";

export default function Page() {
  //To get the session in the client, the component/page must be wrapped in the SessionProvider component.
  return (
    <SessionProvider>
      <UserDetails />
    </SessionProvider>
  );
}
