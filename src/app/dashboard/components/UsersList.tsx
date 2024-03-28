"use client";
import { IUser } from "@/models/User";
import React, { useState } from "react";
import UserRow from "./UserRow";

export default function UsersList({ users }: { users: IUser[] }) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-3xl">Users</h1>
      <div className="p-3 rounded-lg flex justify-between">
        <p className="font-bold w-[25%]">Email</p>
        <p className="font-bold w-[25%]">Email verified</p>
        <p className="font-bold w-[25%]">Role</p>
      </div>
      {users?.map((user, idx) => {
        return <UserRow key={user.email} user={user} />;
      })}
    </div>
  );
}
