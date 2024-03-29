import { createUser } from "@/index";
import { createHashScrypt } from "@/utils/hash";
import { NextResponse } from "next/server";

export async function POST(req) {
  const res = await req.json(); // Parse the request body as JSON

  // Hash the provided password using the createHashScrypt function
  const hashedPassword = await createHashScrypt(res.password);
  const newUser = await createUser({
    email: res.email,
    password: hashedPassword,
  });
  // Return a JSON response with the newly created user object
  return NextResponse.json(newUser);
}
