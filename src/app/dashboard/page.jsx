import { getAllUsers } from "@/index";
import React from "react";
import UsersList from "./components/UsersList";

//I try to keep the page.tsx components SSR, this way, I can directly call the mongoose methods I created and I don't have to get the data from an API. I think it's cleaner this way.
export default async function Page() {
  const users = await getAllUsers();
  console.log(users);
  return <UsersList users={users} />;
}
