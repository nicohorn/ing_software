import User, { IUser } from "./models/User";
import VerificationCode from "./models/VerificationCode";
import dbConnect from "./mongoose";

//All of these functions are the ones that "talk" with the database. These functions are then consumed in the API routes. They return null if anything goes wrong, this way, it's easier to check and therefore, send notifications to the user to inform that something went wrong.

//They're wrapped int a try/catch block so it's easier to debug if anything goes wrong.

//Added a dbConnect on each try block because MongoDB will disconnect automatically after 30 minutes of initializing the dbConnection. If this happens, then these functions will never be able to talk with the DB.

/**This function creates a new user, using the model created in the User.ts mongoose model. If there's a problem creating the user, returns null.*/
export async function createUser({
    email,
    password,
}) {
    //The new user will only have the email and password passed as arguments. Name and last name can and should be added later from the account page. The email verification is done later too.
    try {
        await dbConnect();
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


/**Returns all users from the DB */
export async function getAllUsers() {
    try {
        await dbConnect();
        const users = await User.find()
        return users;
    } catch (e) {
        console.log(e);
        return null;
    }
}

/** Updates the user role */
export async function updateUserRole(email, newRole) {
    try {
        await dbConnect();
        //Documentation https://masteringjs.io/tutorials/mongoose/update
        const updatedUser = await User.findOneAndUpdate({ email: email },
            { role: newRole },
            { new: true })
        return updatedUser;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function updateUserPassword(email, newPassword) {
    try {

        await dbConnect();
        console.log("update user password")
        //Documentation https://masteringjs.io/tutorials/mongoose/update
        const updatedUser = await User.findOneAndUpdate({ email: email },
            { password: newPassword },
            { new: true })
        return updatedUser;
    } catch (e) {
        console.log(e);
        return null;
    }
}

/**This function finds an user by its email,using the model created in the User.ts mongoose model. If it doesn't find an user, returns null.*/
export async function findUserByEmail(email) {
    try {
        await dbConnect();
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
}) {
    try {
        await dbConnect();
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
}) {
    try {
        await dbConnect();
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
}) {
    try {
        await dbConnect();
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
