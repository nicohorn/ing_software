import React from "react";
import LoginForm from "./components/LoginForm";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <LoginForm />
    </main>
  );
}
