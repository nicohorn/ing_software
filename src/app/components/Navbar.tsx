"use client";
import Link from "next/link";
import React from "react";
import { Anton } from "next/font/google";
import { IconUser } from "@tabler/icons-react";

//Next Font for the "logo".
const anton = Anton({
  weight: ["400"],
  subsets: ["latin-ext"],
});
export default function Navbar({
  links,
  session,
}: {
  links: {
    //Some links can have icons, that's why the title can be a string or a ReactNode.
    title: string | React.ReactNode;
    url: string;
    access: string;
  }[];
  session: any;
}) {
  //Dictionary for access control.
  const accessDictionary: { [key: string]: string[] } = {
    admin: ["public", "admin"],
    user: ["public"],
  };
  //Use the function provided by next-auth to access the server session;

  //Use the nav element to make the HTML structure as semantic as possible.
  return (
    <nav className="w-screen fixed top-0 h-20 flex items-center justify-center gap-10 bg-background left-0 z-30 shadow-lg">
      <div
        className={anton.className + " font-extrabold text-4xl active:scale-95"}
      >
        <Link
          className=" transition duration-75 hover:text-black font-semibold px-4 rounded-xl hover:bg-primary hover:shadow-lg"
          href="/"
        >
          Wekthor
        </Link>
      </div>
      <div className="flex items-center gap-1 ">
        {links.map((link) => {
          return (
            <Link
              className={`active:scale-95 transition duration-75 hover:text-black font-semibold px-2 py-1 rounded-xl hover:bg-primary hover:shadow-lg ${
                //If the link access is public, just show it.
                link.access === "public"
                  ? "block"
                  : //If there's a session and the link has some type of access, show it according to the user role
                  session &&
                    accessDictionary[session.user.role].includes(link.access)
                  ? "block"
                  : //If there's no session and the link access is login, show the login link
                  !session && link.access === "login"
                  ? "block"
                  : "hidden"
              }`}
              key={link.url}
              href={link.url}
            >
              {link.title}
            </Link>
          );
        })}
        <Link
          className="rounded-xl p-1 px-2 hover:bg-primary transition hover:text-black hover:shadow-lg"
          href={"/account"}
        >
          {/* If there's an active session, display the link to the account page. */}
          {session ? (
            <div className="flex gap-1 items-center">
              {session.user?.email} <IconUser />
            </div>
          ) : null}
        </Link>
        <button
          onClick={async () => {
            await fetch("/api/email", {
              method: "POST",
              mode: "cors",
              body: JSON.stringify({ email: "nicoskate000@gmail.com" }),
            });
          }}
        >
          Send email
        </button>
      </div>
    </nav>
  );
}
