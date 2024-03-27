import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import { IconLogin } from "@tabler/icons-react";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Wekthor",
  description: "Made with Next.js 14 and NextAuth v4",
};

//Define the links separately. This way it's easier to add or remove links. Also, it's useful if we want to add more functionality or data to each link.
const links = [
  { title: "About", url: "/about", access: "public" },
  { title: "Dashboard", url: "/dashboard", access: "admin" },
  {
    title: (
      <div className="flex gap-2">
        Log in <IconLogin />
      </div>
    ),
    url: "/login",
    //This would be an special access since we don't want this link to show up when we're already logged in.
    access: "login",
  },
];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      {/* Base background color and base text color are black (bg-black) and white (text-white) correspondigly, using Tailwind classes. */}
      <body
        className={
          raleway.className +
          " bg-gradient-to-b from-background  to-background/70 text-white px-10 min-h-screen mt-[80px] p-10"
        }
      >
        <Navbar session={session} links={links} />
        {children}
      </body>
    </html>
  );
}
