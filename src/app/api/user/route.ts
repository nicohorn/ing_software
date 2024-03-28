import { createUser } from "@/index";
import { createHashScrypt } from "@/utils/hash";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const res = await req.json();

  //Hash password here.
  const hashedPassword = await createHashScrypt(res.password);
  const newUser = await createUser({
    email: res.email,
    password: hashedPassword,
  });

  return NextResponse.json(newUser);
}
