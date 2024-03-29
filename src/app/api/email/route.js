import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { createVerificationCode } from "@/index";

//For the mailing part, follow this tutorial: https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/
//I had to tweak a bit the auth object but it's working fine like this!
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.NEXT_PUBLIC_GMAIL_USER, // Your Gmail email address
    clientId: process.env.OAUTH_CLIENTID, // Your OAuth2 client ID
    clientSecret: process.env.OAUTH_CLIENT_SECRET, // Your OAuth2 client secret
    refreshToken: process.env.OAUTH_REFRESH_TOKEN, // Your OAuth2 refresh token
  },
});
export async function POST(req) {

  const data = await req.json(); // Parse the request body as JSON
  const emailTo = data.email; // Extract the email address from the request body
  const code = data.code; // Extract the verification code from the request body

  // Call the createVerificationCode function with the provided verification code and email
  const createNewCode = await createVerificationCode({
    verificationCode: code,
    email: emailTo,
  });

  // If the createVerificationCode function returns a truthy value
  if (createNewCode) {
    const mail = await transporter.sendMail({
      from: "Wekthor <noreply@wekthor.com>",
      sender: "noreply@wekthor.com",
      to: emailTo,
      subject: "Verify your email",
      text: `This is your verifcation code: ${code}`,
    });
    return NextResponse.json({ status: 200, data: mail });
  } else {
    // If the createVerificationCode function returns a falsy value
    // Return a JSON response with an error status and message
    return NextResponse.json({ status: 500, message: "Failed to create the verification code" });
  }
}


// import { Resend } from 'resend';
// import { NextResponse } from "next/server";
// import { createVerificationCode } from "@/index";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req) {
//   const data = await req.json(); // Parse the request body as JSON
//   const emailTo = data.email; // Extract the email address from the request body
//   const code = data.code; // Extract the verification code from the request body

//   // Call the createVerificationCode function with the provided verification code and email
//   const createNewCode = await createVerificationCode({
//     verificationCode: code,
//     email: emailTo,
//   });

//   // If the createVerificationCode function returns a truthy value
//   if (createNewCode) {
//     try {
//       const mail = await resend.emails.send({
//         from: 'Wekthor <noreply@wekthor.com>',
//         to: emailTo,
//         subject: 'Verify your email',
//         text: `This is your verification code: ${code}. Sent with Resend.`,
//       });
//       return NextResponse.json(mail);
//     } catch (error) {
//       console.error('Error sending email with Resend:', error);
//       return NextResponse.json({
//         status: 500,
//         message: 'Failed to send the verification email',
//       });
//     }
//   } else {
//     // If the createVerificationCode function returns a falsy value
//     // Return a JSON response with an error status and message
//     return NextResponse.json({
//       status: 500,
//       message: 'Failed to create the verification code',
//     });
//   }
// }
