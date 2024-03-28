/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { input_styles } from "@/app/login/components/LoginForm";
import { IUser } from "@/models/User";
import {
  Accordion,
  AccordionItem,
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
import { SessionProvider, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

/**This function is responsible for verifying the user's email address */
async function verifyEmail({ email, code }: { email: string; code: string }) {
  // Make a PATCH request to the /api/user/verify_email API endpoint
  const res = await fetch("/api/user/verify_email", {
    method: "PATCH",
    mode: "cors",
    body: JSON.stringify({ email, code }),
  });
  return await res.json();
}

/**This function is responsible for updating the user's name */
async function updateName({
  name,
  lastname,
  email,
}: {
  name: string;
  lastname: string;
  email: string;
}) {
  // Make a PATCH request to the /api/user/update_name API endpoint
  const res = await fetch("/api/user/update_name", {
    method: "PATCH",
    mode: "cors",
    body: JSON.stringify({ name, lastname, email }),
  });

  return await res.json();
}
/**This function is responsible for updating the user's password */
async function updatePassword({
  newPassword,
  oldPassword,
  email,
}: {
  newPassword: string;
  oldPassword: string;
  email: string;
}) {
  // Make a PATCH request to the /api/user/update_name API endpoint
  const res = await fetch("/api/user/update_password", {
    method: "PATCH",
    mode: "cors",
    body: JSON.stringify({ newPassword, oldPassword, email }),
  });

  return await res.json();
}

export const UserDetails = ({ user }: { user: IUser }) => {
  const router = useRouter();

  //Next Auth hook to get the session (client side);
  const { data: session } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const nameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const verifcationCodeRef = useRef<HTMLInputElement>(null);

  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const repeatedNewPasswordRef = useRef<HTMLInputElement>(null);

  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const [loading, setLoading] = useState(false);

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
            <div className="font-bold">{user?.email}</div>
          </div>
          <Divider />
          <div>
            <p className="text-xs">Name</p>
            <div className="font-bold">
              {user?.name ? (
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
          {user?.emailVerified ? (
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
                    // Get the value from the verifcationCodeRef input field
                    const code = verifcationCodeRef.current?.value;
                    // Call the verifyEmail function with the user's email from the session and the provided code
                    const res = await verifyEmail({
                      email: session.user.email, // Use the email from the current session
                      code: code!, // Pass the code value
                    });
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
            <div className="font-bold">{user?.role}</div>
          </div>{" "}
        </CardBody>
      </Card>
      <Card className="bg-red-400 md:max-w-96 w-[95vw] shadow-lg">
        <CardBody>
          <Accordion>
            <AccordionItem
              isCompact
              className="text-xs w-full   rounded-xl font-bold"
              title="Change password"
            >
              <form
                onSubmit={async (e) => {
                  setLoading(true);
                  e.preventDefault();
                  const oldPassword = oldPasswordRef.current?.value;
                  const newPassword = newPasswordRef.current?.value;
                  const repeatedNewPassword =
                    repeatedNewPasswordRef.current?.value;

                  if (newPassword === repeatedNewPassword) {
                    const res = await updatePassword({
                      oldPassword: oldPassword!,
                      newPassword: newPassword!,
                      email: user.email,
                    });

                    console.log(res);

                    if (res.status === 200) {
                      setLoading(false);
                    }
                  } else {
                    setLoading(false);
                    setPasswordsMatch(false);
                    setTimeout(() => {
                      setPasswordsMatch(true);
                    }, 8000);
                  }
                }}
                className="flex flex-col gap-4"
              >
                <Input
                  size="sm"
                  ref={oldPasswordRef}
                  className="text-sm"
                  classNames={input_styles}
                  type="password"
                  label="Current password"
                  variant="flat"
                ></Input>{" "}
                <Input
                  size="sm"
                  ref={newPasswordRef}
                  className="text-sm"
                  classNames={input_styles}
                  type="password"
                  label="New password"
                  variant="flat"
                ></Input>{" "}
                <Input
                  size="sm"
                  ref={repeatedNewPasswordRef}
                  className="text-sm"
                  classNames={input_styles}
                  type="password"
                  label="Repeat new password"
                  variant="flat"
                ></Input>
                {!passwordsMatch && (
                  <p className="animate-pulse">
                    Passwords don't match, try again
                  </p>
                )}
                <Button className="self-end shadow-lg" type="submit">
                  {loading ? (
                    <Spinner color="primary" size="sm" />
                  ) : (
                    "Save changes"
                  )}
                </Button>
              </form>
            </AccordionItem>
          </Accordion>
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
                    const name = nameRef.current?.value!; // Get the value of the name input field
                    const lastname = lastNameRef.current?.value!; // Get the value of the lastname input field

                    //Validate that the name and lastname inputs are not empty
                    if (name.length > 1 && lastname.length > 1) {
                      const res = await updateName({
                        name: name, // Pass the name value to the updateName function
                        lastname: lastname, // Pass the lastname value to the updateName function
                        email: user.email, // Pass the user's email to the updateName function
                      });

                      // If the updateName function returns a truthy value
                      res && router.refresh(); // Refresh the router (update the UI)

                      // After a 1 second delay
                      setTimeout(() => {
                        setLoading(false); // Set the loading state to false
                        onClose(); // Close the modal
                      }, 1000);
                    }
                  }}
                >
                  <Input
                    ref={nameRef}
                    classNames={input_styles}
                    type="text"
                    label="Name"
                    variant="flat"
                  ></Input>
                  <Input
                    ref={lastNameRef}
                    classNames={input_styles}
                    type="text"
                    label="Last name"
                    variant="flat"
                  ></Input>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setLoading(true);
                  }}
                  form="name_edit_form"
                  type="submit"
                  color="primary"
                >
                  {loading ? <Spinner color="white" size="sm" /> : "Save"}
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
