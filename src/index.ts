import User from "./models/User";

/**This function creates a new user, using the model created in the User.ts mongoose model.*/

export async function createUser({ email, password }: { email: string, password: string }) {
    //The new user will only have the email and password as arguments. Name and last name can and should be added later from the account page. The email verification is done later too.
    try {
        const newUser = User.create({ name: null, lastname: null, email: email, password: password, role: "user", emailVerified: null })
        return newUser;
    } catch (e) {
        console.log(e);
        return null;
    }

    //Wrapped int a try/catch block so it's easier to debug if anything goes wrong.

}