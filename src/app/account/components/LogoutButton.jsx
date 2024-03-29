import React from "react";
import { IconLogout } from "@tabler/icons-react";
import { signOut } from "next-auth/react";

export const LogoutButton = () => {
  return (
    <button
      className="bg-gray-200 text-black px-3 py-1 rounded-md shadow-md w-fit flex items-center gap-2"
      onClick={() => {
        signOut({ callbackUrl: "/" });
      }}
    >
      Log out <IconLogout className="stroke-1 " />
    </button>
  );
};
