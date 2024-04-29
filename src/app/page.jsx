import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import { IconLogin } from "@tabler/icons-react";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export default async function Home() {
  const session = await getServerSession(authOptions);
  //For the page.tsx component I always use the <main> element to encapsulate every other HTML element I add. I think this is a clean way to keep the DOM tree consistent.
  return (
    <main className="flex flex-col items-center justify-between text-white">
      <div className=" py-12 sm:py-18 flex flex-col gap-3 px-10 rounded-lg bg-zinc-600">
        <h1 className="text-2xl">Bienvenido al sistema de ejemplo</h1>
        {!session ? (
          <Link
            className="active:scale-95 mx-auto transition duration-75 hover:text-black font-semibold px-2 py-1 rounded-xl hover:bg-success hover:shadow-lg flex gap-2"
            href="/login"
          >
            Iniciar sesión <IconLogin />
          </Link>
        ) : (
          <div className="font-bold text-3xl">{session?.user?.name}</div>
        )}
      </div>
    </main>
  );
}
