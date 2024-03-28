import { verifyEmail } from "@/index";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {

    const data = await req.json();


    // Call the verifyEmail function with the provided email and code
    const verified_email = await verifyEmail({ email: data.email, codeThatTheUserHas: data.code })

    if (verified_email) {
        // If the verifyEmail function returns a truthy value (email verification successful)
        // Return a JSON response with a success message and status code 200
        return NextResponse.json({ status: 200, message: "Successfully verified email" })
    } else {
        // If the verifyEmail function returns a falsy value (email verification failed)
        // Return a JSON response with an error message and status code 500
        return NextResponse.json({ status: 500, message: "Server error, couldn't verify email" })
    }

}