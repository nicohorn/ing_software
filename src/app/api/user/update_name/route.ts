import { updateName } from "@/index";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {

    const data = await req.json();

    const updatedUser = await updateName({ name: data.name, lastname: data.lastname, email: data.email })

    return NextResponse.json(updatedUser)
}