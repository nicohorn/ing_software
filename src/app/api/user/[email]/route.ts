import { findUserByEmail } from "@/index";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { email: string } }) {

    const user = await findUserByEmail(params.email);

    return NextResponse.json({ user })
}