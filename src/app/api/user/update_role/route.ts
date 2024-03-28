import { updateUserRole } from "@/index";
import { IUser } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {


    const data = await req.json(); // Parse the request body as JSON
    // Call mongoose function to update the user's role
    const updatedUser = await updateUserRole(data.email, data.role)

    if (!updatedUser) {
        return NextResponse.json({ status: 500, message: "Error updating user role" })
    }


    return NextResponse.json(updatedUser)
}