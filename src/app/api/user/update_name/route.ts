import { updateName } from "@/index";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {

    const data = await req.json(); // Parse the request body as JSON

    // Call the updateName function with the provided name, lastname, and email
    const updatedUser = await updateName({ name: data.name, lastname: data.lastname, email: data.email })

    // Return a JSON response with the updated user data
    return NextResponse.json(updatedUser)
}