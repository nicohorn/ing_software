import { createUser } from "@/controllers/index";
import { createHashBcrypt } from "@/utils/hash";
import { NextResponse } from "next/server";
import { findUserByEmail } from "@/controllers/index";

export async function POST(req) {
  const data = await req.json(); // Parse the request body as JSON


  const user = await findUserByEmail(data.email);

  //Check if an user already exists with that email. If it does, return an error.
  if (user) {
    return NextResponse.json({ status: 501, message: "User already exists" });
  }

  // Hash the provided password using the createHashScrypt function
  const hashedPassword = await createHashBcrypt(data.password);
  const newUser = await createUser({
    email: data.email,
    password: hashedPassword,
  });
  if (!newUser) {
    return NextResponse.json({ status: 500, message: "Error creating user" });
  }

  // Return a JSON response with the newly created user object
  return NextResponse.json({ status: 200, data: newUser });
}
