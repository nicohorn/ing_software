import { findUserByEmail, updateUserPassword } from "@/controllers/index";
import { createHashBcrypt, verifyHashBcrypt } from "@/utils/hash";
import { NextResponse } from "next/server";

export async function PATCH(req) {

    const data = await req.json(); // Parse the request body as JSON
    const oldPassword = data.oldPassword; // Extract the old password from the request data

    const user = await findUserByEmail(data.email);     // Find the user by their email

    // Verify if the provided old password matches the user's stored password
    const passwordCheck = await verifyHashBcrypt(oldPassword, user.password);

    if (!passwordCheck) {
        // If the old password doesn't match, return an error response
        return NextResponse.json({ status: 500, message: "Passwords don't match" });
    }

    // Hash the new password using bcrypt
    const hashedPassword = await createHashBcrypt(data.newPassword);

    // Call the updateUserPassword function to update the user's password in the database
    const updatedUser = await updateUserPassword(data.email, hashedPassword);

    if (!updatedUser) {
        // If the password update fails, return an error response
        return NextResponse.json({ status: 500, message: "Error updating user password" });
    } else {
        // If the password update is successful, return a success response with the updated user object
        return NextResponse.json({ status: 200, updatedUser: updatedUser });
    }
}