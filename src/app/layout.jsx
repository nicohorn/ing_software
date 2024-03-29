import { Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Wekthor",
  description: "Made with Next.js 14 and NextAuth v4",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      {/* Base background color and base text color are black (bg-black) and white (text-white) correspondigly, using Tailwind classes. */}
      <body
        className={
          raleway.className +
          " bg-background text-white min-h-screen pt-[120px]"
        }
      >
        <Navbar session={session} />
        {children}
        {/* The notification component will target this div to render the notifications */}
        <div id="notifications_container" className="relative" />
      </body>
    </html>
  );
}
