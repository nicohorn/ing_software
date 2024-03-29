/* eslint-disable react/no-unescaped-entities */
"use client";
import { input_styles } from "@/app/login/components/LoginForm";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

async function updatePassword({ email, oldPassword, newPassword }) {
  const res = await fetch("/api/user", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ email, oldPassword, newPassword }),
  });

  return res;
}

export default function SignUpForm() {
  const emailRef = useRef(null);
  const newPassword = useRef(null);
  const newPasswordRepeated = useRef(null);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const router = useRouter();
  return (
    <div>
      <h1 className="font-bold text-2xl ml-2 mb-2">Sign up</h1>
      <Card className="md:max-w-96 w-[95vw] bg-primary" isBlurred>
        <CardBody className="text-black flex flex-col gap-4">
          <form
            onSubmit={async (e) => {
              const email = emailRef.current?.value;
              const password = passwordRef.current?.value;
              const password2 = password2Ref.current?.value;
              /*Once the user clicks on the sign up button, this event will fire.*/
              e.preventDefault();
              //Simple validation, check that both passwords are equal. If they're not, a message will be shown for 8 seconds and the event will return, so the user must make changes in order to complete the registration.
              if (password !== password2) {
                setPasswordsMatch(false);
                setTimeout(() => {
                  setPasswordsMatch(true);
                }, 8000);
                return;
              } else {
                const newUser = await createNewUser({
                  email: email,
                  password: password,
                });
                //The flow here is the following: if the passwords match, the account will be created. The same credentials used for the account creation will be used to automatically log in. This is a nice UX experience. Any further action needed by the user (email confirmation, completing the user profile, etc) should be done afterwards, this way, it's easier to retain users into your app. Of course, we'll need to add an script or something that checks if an account is not verified for more than X days and automatically delete it.
                if (newUser) {
                  signIn("credentials", {
                    email: email,
                    password: password,
                    redirect: false,
                  });

                  //Send email verification code
                  const randomCode = (Math.random() + 1)
                    .toString(36)
                    .substring(7);
                  const verificationCode = await fetch("/api/email", {
                    method: "POST",
                    mode: "cors",
                    body: JSON.stringify({ email: email, code: randomCode }),
                  });
                  console.log(verificationCode);
                } else {
                  console.log("There was an error creating the account");
                }
              }
            }}
            className="flex flex-col gap-3"
          >
            =
            <Input
              ref={newPassword}
              classNames={input_styles}
              type="password"
              label="New password"
              variant="bordered"
            ></Input>
            <Input
              ref={newPasswordRepeated}
              classNames={input_styles}
              type="password"
              label="Repeat new password"
              variant="bordered"
            ></Input>
            <Button
              className="shadow-xl font-semibold"
              type="submit"
              color="success"
            >
              Update password
            </Button>
            {!passwordsMatch && (
              <p className="animate-pulse">Passwords don't match</p>
            )}
          </form>
          <Link href="/login" className="text-xs ml-1">
            Already have an account? Log in here.
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}
