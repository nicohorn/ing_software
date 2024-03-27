
import { scrypt, randomBytes } from 'crypto'


//Creates a hashed password.
export async function createHashScrypt(password: string) {
    const salt = randomBytes(8).toString('hex')
    const hash = await new Promise((resolve, reject) => {
        scrypt(Buffer.from(password, 'utf8'), Buffer.from(salt, 'utf8'), 64, { N: 1024 }, (err, derivedKey) => {
            if (err) reject(err)
            resolve(`${salt}|${derivedKey.toString('hex')}`)
        })
    }) as string
    return hash
}

//Verifies the hash password using the plain text password provided by the user.
export async function verifyHashScrypt(password: string, hash: string) {
    const [salt, key] = hash.split('|')
    const isValid = await new Promise((resolve, reject) => {
        scrypt(Buffer.from(password, 'utf8'), Buffer.from(salt, 'utf8'), 64, { N: 1024 }, (err, derivedKey) => {
            if (err) reject(err)
            resolve(key === derivedKey.toString('hex'))
        })
    }) as boolean
    return isValid
}