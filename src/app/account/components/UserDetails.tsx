/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { input_styles } from "@/app/login/components/LoginForm";
import { IUser } from "@/models/User";
import {
  Button,
  Card,
  CardBody,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { IconCheck, IconLogout } from "@tabler/icons-react";
import { User } from "next-auth";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import React, { useRef } from "react";

async function verifyEmail({ email, code }: { email: string; code: string }) {
  const res = await fetch("/api/user/verify_email", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ email, code }),
  });
  return await res.json();
}

async function updateName({
  name,
  lastname,
  email,
}: {
  name: string;
  lastname: string;
  email: string;
}) {
  const res = await fetch("/api/user/update_name", {
    method: "PATCH",
    mode: "cors",
    body: JSON.stringify({ name, lastname, email }),
  });

  return await res.json();
}

export const UserDetails = ({ user }: { user: IUser }) => {
  //Next Auth hook to get the session (client side);
  const { data: session } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const nameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const verifcationCodeRef = useRef<HTMLInputElement>(null);

  //Show a spinner while the session "loads" (sometimes it gets stuck for a few moments, so it't good that the user sees that it's loading).
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
            <div className="font-bold">{user.email}</div>
          </div>
          <Divider />
          <div>
            <p className="text-xs">Name</p>
            <div className="font-bold">
              {user.name ? (
                <div className="flex justify-between items-center">
                  <p>
                    {user.name} {user.lastname}
                  </p>
                  <Button
                    size="sm"
                    className="my-1 w-fit shadow-md"
                    onPress={onOpen}
                  >
                    Edit name
                  </Button>
                </div>
              ) : (
                <Button
                  size="sm"
                  className="my-1 w-full shadow-md"
                  onPress={onOpen}
                >
                  Add your name
                </Button>
              )}
            </div>
          </div>
          <Divider />
          {user.emailVerified ? (
            <>
              <div>
                <p className="text-xs">Email verified</p>

                <IconCheck className="text-green-400 drop-shadow-md" />
              </div>
              <Divider />
            </>
          ) : (
            <>
              <div className="flex flex-col gap-2">
                <p className="text-xs">Verify email</p>

                <Input
                  size="sm"
                  ref={verifcationCodeRef}
                  className="text-sm"
                  classNames={input_styles}
                  type="text"
                  label="Email code"
                  variant="flat"
                ></Input>
                <Button
                  onClick={async () => {
                    const code = verifcationCodeRef.current?.value;
                    const res = await verifyEmail({
                      email: session.user.email,
                      code: code!,
                    });
                    console.log(res);
                  }}
                  size="sm"
                  className="w-full shadow-md"
                >
                  Verify
                </Button>
              </div>
              <Divider />
            </>
          )}
          <div>
            <p className="text-xs">Role</p>
            <div className="font-bold">{session?.user?.role}</div>
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">
                Your name
              </ModalHeader>
              <ModalBody>
                <form
                  id="name_edit_form"
                  className="flex flex-col gap-5"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const name = nameRef.current?.value!;
                    const lastname = lastNameRef.current?.value!;

                    //Validate that the name and lastname inputs are not empty
                    if (name.length > 1 && lastname.length > 1) {
                      const res = await updateName({
                        name: name,
                        lastname: lastname,
                        email: user.email,
                      });
                      console.log(res);
                    }
                  }}
                >
                  <Input
                    ref={nameRef}
                    classNames={input_styles}
                    type="text"
                    label="Name"
                    variant="bordered"
                  ></Input>
                  <Input
                    ref={lastNameRef}
                    classNames={input_styles}
                    type="text"
                    label="Lastname"
                    variant="bordered"
                  ></Input>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button form="name_edit_form" type="submit" color="primary">
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default function UserDetailsComponent({ user }: { user: IUser }) {
  return (
    <SessionProvider>
      <UserDetails user={user} />
    </SessionProvider>
  );
}
