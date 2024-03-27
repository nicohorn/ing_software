import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';


export async function POST(req: NextRequest) {
    //Checkout https://resend.com/ to get your own API key.
    const resend = new Resend("re_GzJDmg8s_Q9mTRJbtnHBi26rfZwRXGqgJ");
    const data = await req.json();

    const emailTo = data.email;

    const email = await resend.emails.send({
        from: 'wekthor@wekthor.com',
        to: emailTo,
        subject: 'Hello World',
        html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    });

    if (email) {
        console.log("successfully sent email!", emailTo)
    } else {
        console.log("didn't send email!")
    }
    return NextResponse.json(data)
}