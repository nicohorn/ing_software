import User, { IUser } from "./models/User";
import VerificationCode from "./models/VerificationCode";

/**This function creates a new user, using the model created in the User.ts mongoose model.*/

export async function createUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  //The new user will only have the email and password as arguments. Name and last name can and should be added later from the account page. The email verification is done later too.
  try {
    const newUser = User.create({
      name: null,
      lastname: null,
      email: email,
      password: password,
      role: "user",
      emailVerified: null,
    });
    return newUser;
  } catch (e) {
    console.log(e);
    return "Error creating new user";
  }

  //Wrapped int a try/catch block so it's easier to debug if anything goes wrong.
}

export async function findUserByEmail(email: string) {
  try {
    const user = User.findOne({ email: email });
    return user;
  } catch (e) {
    console.log(e);
    return "Error retrieving user (findUserByEmail)";
  }
}

export async function createVerificationCode({
  verificationCode,
  email,
}: {
  verificationCode: string;
  email: string;
}) {
  try {
    const newVerificationCode = await VerificationCode.create({
      verificationCode: verificationCode,
      email: email,
      createdAt: new Date(),
    });
    return newVerificationCode;
  } catch (e) {
    console.log(e);
    return "Error creating verification code";
  }
}

export async function verifyEmail({
  email,
  codeThatTheUserHas,
}: {
  email: string;
  codeThatTheUserHas: string;
}) {
  try {
    const findCode = await VerificationCode.findOne({ email: email });
    if (findCode.verificationCode === codeThatTheUserHas) {
      //Documentation https://masteringjs.io/tutorials/mongoose/update
      const user = await User.findOneAndUpdate(
        { email: email },
        { emailVerified: new Date() },
        { new: true }
      );
      return { verifiedEmail: true };
    }
    return { verifiedEmail: false };
  } catch (e) {
    console.log(e);
    return "Error verifying email";
  }
}

export async function updateName({
  name,
  lastname,
  email,
}: {
  name: string;
  lastname: string;
  email: string;
}) {
  try {
    const user = await User.findOneAndUpdate(
      { email: email },
      { name: name, lastname: lastname },
      { new: true }
    );
    return user;
  } catch (e) {
    console.log(e);
    return "Error updating name of the user";
  }
}
