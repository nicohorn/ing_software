import { findUserByEmail } from "@/index";
import { NextResponse } from "next/server";

export async function POST(req) {
    const data = await req.json();

    const email = data.email;


    console.log("REQUEST", { req })

    // Check if the 'email' parameter is present
    if (!email) {
        // If the 'email' parameter is missing, return a 400 Bad Request response with an error message
        return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
    }

    console.log(email);

    const user = await findUserByEmail(email);

    // Check if a user was found

    if (!user) {
        // If no user was found, return a 404 Not Found response with an error message
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    // If a user was found, return a 200 OK response with the user data
    return NextResponse.json({ status: 200, message: "User found" });
}