"use client";
import {
  Button,
  Card,
  CardBody,
  Divider,
  Spinner,
  user,
} from "@nextui-org/react";
import { IconLogout } from "@tabler/icons-react";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import React, { Suspense } from "react";

export default function Page() {
  //To get the session in the client, the component/page must be wrapped in the SessionProvider component.
  return (
    <SessionProvider>
      <UserDetails />
    </SessionProvider>
  );
}

const UserDetails = () => {
  //Next Auth hook to get the session (client side);
  const { data: session } = useSession();

  if (!session)
    return (
      <div className="flex justify-center items-center ">
        <Spinner className="my-2 drop-shadow-md mx-auto mt-20" color="white" />
      </div>
    );

  return (
    <div className="flex justify-center items-center flex-col gap-2 w-fit mx-auto">
      <h1 className="font-bold text-2xl self-start ml-2">Account details</h1>
      <Card className="md:max-w-96 w-[95vw] bg-primary shadow-lg" isBlurred>
        <CardBody className="text-black flex flex-col gap-4">
          <div>
            <p className="text-xs">Email</p>
            <p className="font-bold">{session?.user?.email}</p>
          </div>
          <Divider />
          <div>
            <p className="text-xs">Name</p>
            <p className="font-bold">
              {session?.user?.name} {session?.user?.lastname}
            </p>
          </div>
          <Divider />
          <div>
            <p className="text-xs">Role</p>
            <p className="font-bold">{session?.user?.role}</p>
          </div>{" "}
        </CardBody>
      </Card>
      <Button
        className="w-fit shadow-lg"
        onClick={() => {
          //When user logs out, go back to the landing page.
          signOut({ callbackUrl: "/" });
        }}
      >
        Log out <IconLogout className="text-black stroke-1" />
      </Button>
    </div>
  );
};
