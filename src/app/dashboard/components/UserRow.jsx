import { IconCheck, IconX } from "@tabler/icons-react";
import React from "react";
import ListboxComponent from "./ListboxComponent";

export default function UserRow({ user }) {
  return (
    <div
      className="bg-primary shadow-md p-3 rounded-lg flex  justify-between items-center"
      key={user.email}
    >
      <p className="w-[25%]">{user.email}</p>
      <p className="w-[25%]">
        {user.emailVerified ? (
          <IconCheck className="drop-shadow-md" />
        ) : (
          <IconX className="drop-shadow-md" />
        )}
      </p>
      <div className="w-[25%] drop-shadow-md flex gap-2 relative">
        <ListboxComponent
          options={[
            { label: "Admin", value: "admin" },
            { label: "User", value: "user" },
          ]}
          placeholder={user.role}
          data={user}
        />
      </div>
    </div>
  );
}
