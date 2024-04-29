import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { findUserByEmail } from "@/controllers/index";
import jwt from "jsonwebtoken";

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.NEXT_PUBLIC_GMAIL_USER,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

export async function POST(req) {
  const data = await req.json();
  const email = data.email;
  const password = data.password;

  // Check if user already exists
  const user = await findUserByEmail(data.email);
  if (user) {
    console.log("User already exists");
    return NextResponse.json({ status: 501, message: "Email already exists" });
  }


  // Create a JWT token containing user information
  const token = jwt.sign({ email, password }, process.env.NEXTAUTH_SECRET, {
    expiresIn: "1h",
  });

  // Generate a verification link with the JWT token
  const verificationLink = `${process.env.NEXTAUTH_URL}/account_verification/${token}`;


  try {
    const mail = await transporter.sendMail({
      from: "Wekthor <noreply@wekthor.com>",
      sender: "noreply@wekthor.com",
      to: email,
      subject: "Verify your email",
      text: `Please click the following link to verify your email: ${verificationLink}`,
      html: `<p>Please click the following link to verify your email:</p><a href="${verificationLink}"> Create account</a>`,
    });

    return NextResponse.json({ status: 200, data: mail });
  } catch (error) {
    console.error("Failed to send verification email:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to send verification email",
    });
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
