import { createUser } from "@/index";
import { createHashBcrypt } from "@/utils/hash";
import { NextResponse } from "next/server";

export async function POST(req) {
  const res = await req.json(); // Parse the request body as JSON

  // Hash the provided password using the createHashScrypt function
  const hashedPassword = await createHashBcrypt(res.password);
  const newUser = await createUser({
    email: res.email,
    password: hashedPassword,
  });
  if (!newUser) {
    return NextResponse.json({ status: 500, message: "Error creating user" });
  }

  // Return a JSON response with the newly created user object
  return NextResponse.json({ status: 200, data: newUser });
}
