import PasswordRecoverToken from "./models/PasswordRecoverToken";
import User from "./models/User";
import VerificationCode from "./models/VerificationCode";
import dbConnect from "./mongoose";

// All of these functions are the ones that "talk" with the database. These functions are then consumed in the API routes.
// They return null if anything goes wrong, this way, it's easier to check and therefore, send notifications to the user to inform that something went wrong.

// They're wrapped in a try/catch block so it's easier to debug if anything goes wrong.

// Added a dbConnect on each try block because MongoDB will disconnect automatically after 30 minutes of initializing the dbConnection.
// If this happens, then these functions will never be able to talk with the DB.

/**
 * Creates a new user using the User mongoose model.
 * @param {Object} userData - The user data object.
 * @param {string} userData.email - The user's email.
 * @param {string} userData.password - The user's password.
 * @returns {Promise<User|null>} The created user or null if an error occurs.
 */
async function createUser({ email, password }) {
    // The new user will only have the email and password passed as arguments.
    // Name and last name can and should be added later from the account page.
    // The email verification is done later too.
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

/**
 * Retrieves all users from the database.
 * @returns {Promise<User[]|null>} An array of users or null if an error occurs.
 */
async function getAllUsers() {
    try {
        await dbConnect();
        const users = await User.find();
        return users;
    } catch (e) {
        console.log(e);
        return null;
    }
}

/**
 * Updates the role of a user.
 * @param {string} email - The email of the user to update.
 * @param {string} newRole - The new role to assign to the user.
 * @returns {Promise<User|null>} The updated user or null if an error occurs.
 */
async function updateUserRole(email, newRole) {
    try {
        await dbConnect();
        // Documentation: https://masteringjs.io/tutorials/mongoose/update
        const updatedUser = await User.findOneAndUpdate(
            { email: email },
            { role: newRole },
            { new: true }
        );
        return updatedUser;
    } catch (e) {
        console.log(e);
        return null;
    }
}

/**
 * Updates the password of a user.
 * @param {string} email - The email of the user to update.
 * @param {string} newPassword - The new password to set for the user.
 * @returns {Promise<User|null>} The updated user or null if an error occurs.
 */
async function updateUserPassword(email, newPassword) {
    try {
        await dbConnect();
        console.log("update user password");
        // Documentation: https://masteringjs.io/tutorials/mongoose/update
        const updatedUser = await User.findOneAndUpdate(
            { email: email },
            { password: newPassword },
            { new: true }
        );
        return updatedUser;
    } catch (e) {
        console.log(e);
        return null;
    }
}

/**
 * Finds a user by their email using the User mongoose model.
 * @param {string} email - The email of the user to find.
 * @returns {Promise<User|null>} The found user or null if not found or an error occurs.
 */
async function findUserByEmail(email) {
    try {
        await dbConnect();
        const user = await User.findOne({ email: email });
        return user;
    } catch (e) {
        console.log(e);
        return null;
    }
}

/**
 * Creates a unique verification code for the user that creates a new account.
 * @param {Object} codeData - The verification code data object.
 * @param {string} codeData.verificationCode - The verification code.
 * @param {string} codeData.email - The email associated with the verification code.
 * @returns {Promise<VerificationCode|null>} The created or updated verification code or null if an error occurs.
 */
async function createVerificationCode({ verificationCode, email }) {
    try {
        await dbConnect();

        // Check if a verification code already exists for the email
        const existingCode = await VerificationCode.findOne({ email: email });

        if (existingCode) {
            // If a verification code exists, update it with the new code
            existingCode.verificationCode = verificationCode;
            existingCode.createdAt = new Date();
            await existingCode.save();
            return existingCode;
        } else {
            // If no verification code exists, create a new one
            const newVerificationCode = await VerificationCode.create({
                verificationCode: verificationCode,
                email: email,
                createdAt: new Date(),
            });
            return newVerificationCode;
        }
    } catch (e) {
        console.log(e);
        return null;
    }
}

/**
 * Verifies an account by checking the verification code provided by the user.
 * @param {Object} verificationData - The verification data object.
 * @param {string} verificationData.email - The email of the user to verify.
 * @param {string} verificationData.codeThatTheUserHas - The verification code provided by the user.
 * @returns {Promise<User|null>} The verified user or null if verification fails or an error occurs.
 */
async function verifyEmail({ email, codeThatTheUserHas }) {
    try {
        await dbConnect();
        const findCode = await VerificationCode.findOne({ email: email });
        if (findCode.verificationCode === codeThatTheUserHas) {
            // Documentation: https://masteringjs.io/tutorials/mongoose/update
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

/**
 * Updates the name and last name of a user.
 * @param {Object} userData - The user data object.
 * @param {string} userData.name - The new name of the user.
 * @param {string} userData.lastname - The new last name of the user.
 * @param {string} userData.email - The email of the user to update.
 * @returns {Promise<User|null>} The updated user or null if an error occurs.
 */
async function updateUserName({ name, lastname, email }) {
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


/**
 * Creates a new password recovery token.
 * @async
 * @param {Object} options - The options for creating the password recovery token.
 * @param {string} options.passwordRecoveryToken - The password recovery token.
 * @param {string} options.email - The email associated with the password recovery token.
 * @returns {Promise<Object|null>} The newly created password recovery token or null if an error occurs.
 */
async function createPasswordRecoveryToken({ passwordRecoveryToken, email }) {
    try {
        // Connect to the database
        await dbConnect();

        /**
         * Create a new password recovery token.
         * @type {Object}
         * @property {string} token - The password recovery token.
         * @property {string} email - The email associated with the password recovery token.
         * @property {Date} createdAt - The timestamp when the token was created.
         */
        const newPasswordRecoveryToken = await PasswordRecoverToken.create({
            token: passwordRecoveryToken,
            email: email,
            createdAt: new Date(),
        });

        return newPasswordRecoveryToken;
    } catch (e) {
        // Log any errors that occur
        console.log(e);
        return null;
    }
}

/**
 * Finds a password recovery token by email.
 * @async
 * @param {string} email - The email to search for.
 * @returns {Promise<Object|null>} The found password recovery token or null if not found or an error occurs.
 */
async function findTokenByEmail(email) {
    try {
        // Connect to the database
        await dbConnect();

        /**
         * Find a password recovery token by email.
         * @type {Object}
         */
        const passwordRecoveryToken = await PasswordRecoverToken.findOne({ email: email });

        return passwordRecoveryToken;
    } catch (e) {
        // Log any errors that occur
        console.log(e);
        return null;
    }
}

module.exports = {
    createUser,
    getAllUsers,
    updateUserRole,
    updateUserPassword,
    findUserByEmail,
    createVerificationCode,
    verifyEmail,
    updateUserName,
    createPasswordRecoveryToken,
    findTokenByEmail
};