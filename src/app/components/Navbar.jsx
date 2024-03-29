"use client";
import Link from "next/link";
import React from "react";
import { Anton } from "next/font/google";
import { IconMenu, IconUser } from "@tabler/icons-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
} from "@nextui-org/react";

//Next Font for the "logo".
const anton = Anton({
  weight: ["400"],
  subsets: ["latin-ext"],
});
export default function Navbar({ links, session }) {
  //Dictionary for access control.
  const accessDictionary = {
    admin: ["public", "admin"],
    user: ["public"],
  };

  //Use the nav element to make the HTML structure as semantic as possible.

  //This components render two navbars. One is displayed in screens that are wider than 768px. The other is for screen that their width is less than 768px.
  return (
    <>
      {" "}
      <nav className="w-screen fixed top-0 h-20 md:flex hidden items-center justify-center gap-10 bg-background left-0 z-30 shadow-lg">
        <div
          className={
            anton.className + " font-extrabold text-4xl active:scale-95"
          }
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
        </div>
      </nav>{" "}
      <nav className="w-screen fixed top-0 flex flex-col md:hidden items-center justify-center gap-10 bg-background left-0 z-30 py-5 shadow-xl">
        <Dropdown>
          <DropdownTrigger>
            <Button
              aria-label="Show/close navbar"
              color="priamry"
              variant="bordered"
            >
              <IconMenu />
            </Button>
          </DropdownTrigger>
          <DropdownMenu className="text-black " aria-label="Navbar">
            <DropdownItem
              className=" transition duration-75 hover:text-black font-bold rounded-xl hover:bg-primary hover:shadow-lg"
              href="/"
            >
              Wekthor
            </DropdownItem>
            {links.map((link) => {
              return (
                <DropdownItem
                  className={`active:scale-95 transition duration-75 hover:text-black font-semibold px-2 py-1 rounded-xl hover:bg-primary hover:shadow-lg ${
                    link.access === "public"
                      ? "block"
                      : session &&
                        accessDictionary[session.user.role].includes(
                          link.access
                        )
                      ? "block"
                      : !session && link.access === "login"
                      ? "block"
                      : "hidden"
                  }`}
                  key={link.url}
                  href={link.url}
                >
                  {link.title}
                </DropdownItem>
              );
            })}
            <DropdownItem
              className="rounded-xl p-1 px-2 hover:bg-primary transition hover:text-black hover:shadow-lg"
              href={"/account"}
            >
              {session ? (
                <div className="flex gap-1 items-center">
                  {session.user?.email} <IconUser />
                </div>
              ) : null}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </nav>
    </>
  );
}
