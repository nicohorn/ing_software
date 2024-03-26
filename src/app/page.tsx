import Image from "next/image";

export default function Home() {
  //For the page.tsx component I always use the <main> element to encapsulate every other HTML element I add. I think this is a clean way to keep the DOM tree consistent.
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>ASD</div>
    </main>
  );
}
