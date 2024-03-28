/* eslint-disable react/no-unescaped-entities */
"use client";
import { input_styles } from "@/app/login/components/LoginForm";
import { createHashScrypt } from "@/utils/hash";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { createHash } from "crypto";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

async function createNewUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await fetch("/api/user", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ email, password }),
  });

  return res;
}

export default function SignUpForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);
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
                console.log("Succesfully registered");
                const newUser = await createNewUser({
                  email: email!,
                  password: password!,
                });
                //The flow here is the following: if the passwords match, the account will be created. The same credentials used for the account creation will be used to automatically log in. This is a nice UX experience. Any further action needed by the user (email confirmation, completing the user profile, etc) should be done afterwards, this way, it's easier to retain users into your app. Of course, we'll need to add an script or something that checks if an account is not verified for more than X days and automatically delete it.
                if (newUser) {
                  signIn("credentials", {
                    email: email,
                    password: password,
                    callbackUrl: "/account",
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
            <Input
              ref={emailRef}
              classNames={input_styles}
              type="text"
              label="Email"
              variant="bordered"
            ></Input>
            <Input
              ref={passwordRef}
              classNames={input_styles}
              type="password"
              label="Password"
              variant="bordered"
            ></Input>
            <Input
              ref={password2Ref}
              classNames={input_styles}
              type="password"
              label="Repeat password"
              variant="bordered"
            ></Input>
            <Button
              className="shadow-xl font-semibold"
              type="submit"
              color="success"
            >
              Sign up
            </Button>
            {!passwordsMatch && (
              <p className="animate-pulse">Passwords don't match</p>
            )}
          </form>
          <p className="text-xs ml-1">Forgot your password? Click here.</p>
        </CardBody>
      </Card>
    </div>
  );
}
