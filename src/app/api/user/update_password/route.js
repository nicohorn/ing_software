import { findUserByEmail, updateUserPassword } from "@/index";
import { createHashBcrypt, verifyHashBcrypt } from "@/utils/hash";
import { NextResponse } from "next/server";


export async function PATCH(req) {

    const data = await req.json(); // Parse the request body as JSON

    const oldPassword = data.oldPassword
    const user = await findUserByEmail(data.email);
    const passwordCheck = await verifyHashBcrypt(oldPassword, user.password)

    if (!passwordCheck) {
        return NextResponse.json({ status: 500, message: "Passwords don't match" })
    }


    const hashedPassword = await createHashBcrypt(data.newPassword);

    // Call mongoose function to update the user's password 
    const updatedUser = await updateUserPassword(data.email, hashedPassword)

    if (!updatedUser) {
        return NextResponse.json({ status: 500, message: "Error updating user password" })
    }



    return NextResponse.json({ status: 200, updatedUser: updatedUser })
}