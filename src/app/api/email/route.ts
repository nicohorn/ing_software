import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { createVerificationCode } from "@/index";

//For the mailing part, follow this tutorial: https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/
//I had to tweak a bit the auth object but it's working fine like this!
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.NEXT_PUBLIC_GMAIL_USER, //Your gmail
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});
export async function POST(req: NextRequest) {
  const data = await req.json();

  const emailTo = data.email;
  const code = data.code;

  const createNewCode = await createVerificationCode({
    verificationCode: code,
    email: emailTo,
  });

  if (createNewCode) {
    const mail = await transporter.sendMail({
      from: "Wekthor <noreply@wekthor.com>",
      sender: "noreply@wekthor.com",
      to: emailTo,
      subject: "Verify your email",
      text: `This is your verifcation code: ${code}`,
    });
    return NextResponse.json(mail);
  } else {
    return NextResponse.json({ status: 500, message: createNewCode });
  }
}
