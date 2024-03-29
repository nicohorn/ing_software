//Documentation: https://authjs.dev/reference/adapter/mongodb?_gl=1*mpl5i8*_gcl_au*MzYyMzU5MjgxLjE3MDkzNjQzODY

import { MongoClient } from "mongodb"

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise;


// In production mode, it's best to not use a global variable.
client = new MongoClient(uri, options)
clientPromise = client.connect()


// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise