"use client";
import React, { useState } from "react";
import UserRow from "./UserRow";

export default function UsersList({ users }) {
  return (
    <div className="flex flex-col gap-2 md:mx-20 mx-3">
      <h1 className="font-bold text-3xl">Usuarios</h1>
      <div className="p-3 rounded-lg flex justify-between">
        <p className="font-bold w-[25%]">Email</p>
        <p className="font-bold w-[25%]">Nombre</p>
        <p className="font-bold w-[25%]">Rol</p>
      </div>
      {users?.map((user) => {
        return <UserRow key={user.email} user={user} />;
      })}
    </div>
  );
}
