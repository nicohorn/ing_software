import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { findUserByEmail } from "@/controllers/index";
import UserDetailsComponent from "./components/UserDetails";

export default async function Page() {
  // Get the server-side session using the authOptions
  const session = await getServerSession(authOptions);

  // Find the user in the database based on the email from the session
  const user = await findUserByEmail(session.user.email);
  

  // Render the UserDetailsComponent and pass the user data as a prop
  return <UserDetailsComponent user={user} />;
}
