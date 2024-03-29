/* eslint-disable react/no-unescaped-entities */
"use client";
//Since this component makes use of event handlers, it needs to be converted to client component using the "use client" directive.
import React, { useRef, useState } from "react";
import { Card, CardBody, Button, Input, Spinner } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/*This component, is mostly styles from the NextUI library. The key thing here is to pass a ref to the inputs and use the value of the inputs email and password to log in when the button in the form is clicked (submit button).*/

/*Basically, as long as you have the form, the two inputs with their refs (useRef) and the submit button, you have all you need to perform the log in flow */

export const input_styles = {
  label: "text-black/50",
  input: ["bg-transparent", "text-black/90", "placeholder:text-black/50"],
  innerWrapper: "bg-transparent",
  inputWrapper: [
    "shadow-xl",
    "bg-default-200/50",
    "dark:bg-default/60",
    "backdrop-blur-xl",
    "backdrop-saturate-200",
    "hover:bg-default-200/70",
    "dark:hover:bg-default/70",
    "group-data-[focused=true]:bg-default-200/50",
    "dark:group-data-[focused=true]:bg-default/60",
    "!cursor-text",
  ],
};

export default function LoginForm() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  return (
    <div>
      <h1 className="font-bold text-2xl ml-2 mb-2">Log in</h1>
      <Card className="md:max-w-96 w-[95vw] bg-primary" isBlurred>
        <CardBody className="text-black flex flex-col gap-4">
          <form
            onSubmit={async (e) => {
              setLoading(true);
              /*Once the user clicks on the log in button, this event will fire. I'm using the signIn function provided by next-auth*/
              e.preventDefault();
              const res = await signIn("credentials", {
                email: emailRef.current?.value,
                password: passwordRef.current?.value,
                redirect: false,
              });

              if ((res && res.status !== 200) || (res && res.error)) {
                setInvalidCredentials(true);
                setLoading(false);
                setTimeout(() => {
                  setInvalidCredentials(false);
                }, 8000);
              } else {
                router.push("/account");
                router.refresh();
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
            <Button
              className="shadow-xl font-semibold"
              type="submit"
              color="success"
            >
              {loading ? <Spinner color="white" size="sm" /> : "Log in"}
            </Button>
            {invalidCredentials && (
              <p className="animate-pulse">Invalid credentials, try again</p>
            )}
          </form>
          <Link href="/signup" className="text-xs ml-1">
            Don't have an account? Create one here.
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}
