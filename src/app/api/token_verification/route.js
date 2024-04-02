// Import required functions and modules
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import dbConnect from "@/mongoose";



//This handler receives a token and verifies it. If it's valid, it returns the data in the token. Otherwise, it just returns valid false.
export async function POST(req) {
    const data = await req.json();
    try {

        await dbConnect();
        const decoded = jwt.verify(data.token, process.env.NEXTAUTH_SECRET);

        return NextResponse.json({ status: 200, valid: true, data: decoded });
    } catch (e) {
        console.log(e)
        return NextResponse.json({ status: 200, valid: false });
    }
}