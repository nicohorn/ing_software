
export type CustomUserType = {

    _id: string,
    name: string,
    lastname: string,
    email: string,
    emailVerified: Date;
    role: string,
}

import { User } from "next-auth"


//For Next Auth to recognize any other keys we add to the User type, we need to add it in this interface. I'm doing that by defining a type (User) and then combining it with the DefaultSession (although you can just not combine them and use the type you defined).
declare module "next-auth" {
    interface Session {
        user: CustomUserType & DefaultSession['user']
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: string;

    }
}

