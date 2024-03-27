import { verifyEmail } from "@/index";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const data = await req.json();


    const verified_email = await verifyEmail({ email: data.email, codeThatTheUserHas: data.code })

    if (verified_email) {
        return NextResponse.json({ status: 200, message: "Successfully verified email" })
    } else {
        return NextResponse.json({ status: 500, message: "Server error, couldn't verify email" })
    }

}