import { findUserByEmail } from "@/index";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    // Check if the 'email' parameter is present
    if (!email) {
        // If the 'email' parameter is missing, return a 400 Bad Request response with an error message
        return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
    }

    const user = await findUserByEmail(email);

    // Check if a user was found

    if (!user) {
        // If no user was found, return a 404 Not Found response with an error message
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    // If a user was found, return a 200 OK response with the user data
    return NextResponse.json(user);
}