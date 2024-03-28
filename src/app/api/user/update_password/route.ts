import { findUserByEmail, updateUserPassword } from "@/index";
import { createHashScrypt, verifyHashScrypt } from "@/utils/hash";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(req: NextRequest) {

    const data = await req.json(); // Parse the request body as JSON

    const oldPassword = data.oldPassword
    const user = await findUserByEmail(data.email)!;
    const passwordCheck = await verifyHashScrypt(oldPassword, user.password!)

    if (!passwordCheck) {
        return NextResponse.json({ status: 500, message: "Passwords don't match" })
    }


    const hashedPassword = await createHashScrypt(data.newPassword!);

    // Call mongoose function to update the user's password 
    const updatedUser = await updateUserPassword(data.email, hashedPassword)

    if (!updatedUser) {
        return NextResponse.json({ status: 501, message: "Error updating user password" })
    }



    return NextResponse.json({ status: 200, updatedUser: updatedUser })
}