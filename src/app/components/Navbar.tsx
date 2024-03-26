import Link from "next/link";
import React from "react";
import { Anton } from "next/font/google";
import { IconUser } from "@tabler/icons-react";
const anton = Anton({
  weight: ["400"],
  subsets: ["latin-ext"],
});

export default function Navbar({
  links,
}: {
  links: {
    title: string;
    url: string;
    access: string;
  }[];
}) {
  //Use the nav element to make the HTML structure as semantic as possible.
  return (
    <nav className="w-screen fixed top-0 h-20 flex items-center justify-center gap-10 bg-background left-0">
      <div className={anton.className + " font-extrabold text-4xl "}>
        <Link
          className="active:scale-95 transition hover:text-accent font-semibold px-4 rounded-full hover:bg-primary"
          href="/"
        >
          Wekthor
        </Link>
      </div>
      <div className="flex items-center gap-1 ">
        {links.map((link) => {
          return (
            <Link
              className="active:scale-95 transition hover:text-accent font-semibold px-2 py-1 rounded-full hover:bg-primary"
              key={link.url}
              href={link.url}
            >
              {link.title}
            </Link>
          );
        })}
        <Link
          className="rounded-full p-1 hover:bg-primary hover:text-accent "
          href={"/account"}
        >
          <IconUser />
        </Link>
      </div>
    </nav>
  );
}
