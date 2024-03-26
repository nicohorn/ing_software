"use client";
//Since this component makes use of event handlers, it needs to be converted to client component using the "use client" directive.
import React, { useRef } from "react";
import { Card, CardBody, Button, Input } from "@nextui-org/react";

/*Don't get scared about this component, it's mostly styles from the NextUI library. The key thing here is to pass a ref to the inputs and use the value of the inputs email and password to log in when the button in the form is clicked (submit button).*/

/*Basically, as long as you have the form, the two inputs with their refs (useRef) and the submit button, you have all you need to perform the log in flow */

const input_styles = {
  label: "text-white/50",
  input: [
    "bg-transparent",
    "text-white/90",
    "placeholder:text-white/50 dark:placeholder:text-white/60",
  ],
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
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <h1 className="font-bold text-2xl ml-2 mb-2">Log in</h1>
      <Card className="md:max-w-96 w-[95vw] bg-primary" isBlurred>
        <CardBody className="text-white flex flex-col gap-4">
          <form
            onSubmit={(e) => {
              /*Once the user clicks on the log in button, this event will fire. I'm using the signIn function provided by next-auth*/
              e.preventDefault();
              console.log(emailRef.current!.value);
              console.log(passwordRef.current!.value);
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
              Log in
            </Button>
          </form>
          <p className="text-xs ml-1">Forgot your password? Click here.</p>
        </CardBody>
      </Card>
    </div>
  );
}
