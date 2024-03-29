import { updateUserName } from "@/index";
import { NextResponse } from "next/server";

export async function PATCH(req) {

    const data = await req.json(); // Parse the request body as JSON

    // Call the updateName function with the provided name, lastname, and email
    const updatedUser = await updateUserName({ name: data.name, lastname: data.lastname, email: data.email })

    // Return a JSON response with the updated user data

    if (updatedUser) { return NextResponse.json({ status: 200, data: updatedUser }) }
    else {
        return NextResponse.json({ status: 500, message: "Error updating name of the user" })
    }

}