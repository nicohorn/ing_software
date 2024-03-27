import mongoose from 'mongoose';


export interface IUser {
    name?: string,
    lastname?: string,
    email: string,
    password: string,
    emailVerified?: Date,
    image?: string,
    role: string
}


const UserSchema = new mongoose.Schema<IUser>({
    // The name property is required by Next-Auth.js
    name: {
        type: String,
        required: false,
    },
    lastname: {
        type: String,
        required: false,

    },
    // The email property is required by Next-Auth.js
    // The unique property prevents that an email is registered more than once.
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    // The emailVerified property is recommended by Next-Auth.js
    emailVerified: {
        type: Date,
    },
    // The image property is recommended by Next-Auth.js
    image: {
        type: String,
    },
    role: {
        type: String,
    }
});


export default mongoose.models.User || mongoose.model('User', UserSchema);