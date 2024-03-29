import { findUserByEmail } from "@/index";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.NEXTAUTH_SECRET; // I'm using the same secret as the one I'm using in Next Auth

export async function POST(req) {
    const data = await req.json();
    const email = data.email;

    // Check if the 'email' parameter is present
    if (!email) {
        // If the 'email' parameter is missing, return a 400 Bad Request response with an error message
        return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
    }

    console.log(email);
    const user = await findUserByEmail(email);

    // Check if a user was found
    if (!user) {
        // Since we're dealing with sensitive information, we'll answer to these requests with a 200 status code always.
        // This way, if there's an attacker looking to extract information, they won't be able to.
        return NextResponse.json({ status: 200, message: "Success" });
    } else {
        // If a user is found, create a token and send a link to their email.
        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        const resetLink = `${process.env.NEXTAUTH_URL}/forgot_password/${token}`;

        // Send the reset link to the user's email (you'll need to implement the email sending logic)
        await sendResetEmail(user.email, resetLink);

        return NextResponse.json({ status: 200, message: "Success" });
    }
}