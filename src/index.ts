import User, { IUser } from "./models/User";
import VerificationCode from "./models/VerificationCode";

//All of these functions are the ones that "talk" with the database. This functions are then consumed in the API routes. They return null if anything goes wrong, this way, it's easier to check and therefore, send notifications to the user to inform that something went wrong.

//They're wrapped int a try/catch block so it's easier to debug if anything goes wrong.

/**This function creates a new user, using the model created in the User.ts mongoose model. If there's a problem creating the user, returns null.*/

export async function createUser({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    //The new user will only have the email and password as arguments. Name and last name can and should be added later from the account page. The email verification is done later too.
    try {
        const newUser = await User.create({
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
        return null;
    }

}

export async function getAllUsers(): Promise<IUser[] | null> {
    try {
        const users = await User.find()
        return users;
    } catch (e) {
        console.log(e);
        return null;
    }
}

/**This function finds an user by its email,using the model created in the User.ts mongoose model. If it doesn't find an user, returns null.*/
export async function findUserByEmail(email: string) {
    try {
        const user = await User.findOne({ email: email });
        return user;
    } catch (e) {
        console.log(e);
        return null;
    }
}

/**This function creates a unique verification code for the user that creates a new account */
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
        return null;
    }
}

/**This function verifies an account. The user must provide the code that has been sent to its email */
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

            return user;
        }
        return null;
    } catch (e) {
        console.log(e);
        return null;
    }
}


/** This function updates the name and last name of the user */
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
        return null;
    }
}
