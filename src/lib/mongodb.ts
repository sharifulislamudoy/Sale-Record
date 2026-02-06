import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI as string

if (!uri) {
  throw new Error("Add MONGODB_URI in .env.local")
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

// @ts-ignore
if (!global._mongoClientPromise) {
  client = new MongoClient(uri)
  // @ts-ignore
  global._mongoClientPromise = client.connect()
}

// @ts-ignore
clientPromise = global._mongoClientPromise

export default clientPromise