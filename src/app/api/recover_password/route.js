// Import required functions and modules
import { findTokenByEmail, updateUserPassword } from "@/index";
import { createHashBcrypt } from "@/utils/hash";
import { NextResponse } from "next/server";

export async function PATCH(req) {
    // Parse the request body as JSON
    const data = await req.json();
    // Find the password recovery token associated with the provided email
    const passwordRecoveryToken = await findTokenByEmail(data.email);


    console.log(passwordRecoveryToken)

    if (passwordRecoveryToken) {
        // Check if the token provided by the user matches the stored token
        if (passwordRecoveryToken.token === data.tokenFromUser) {
            // Hash the new password using bcrypt
            const hashedPassword = await createHashBcrypt(data.newPassword);

            // Update the user's password with the new hashed password
            await updateUserPassword(data.email, hashedPassword);

            // Return a success response
            return NextResponse.json({
                status: 200,
                message: "Successfully updated password"
            });
        }
    }

    // Return an error response if the token is invalid or an error occurs
    return NextResponse.json({
        status: 500,
        message: "Error updating password"
    });
}