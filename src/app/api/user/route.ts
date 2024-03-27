import { createUser } from "@/index";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

    const res = await req.json();

    const newUser = await createUser({ email: res.email, password: res.password });

    return NextResponse.json(newUser);
}
