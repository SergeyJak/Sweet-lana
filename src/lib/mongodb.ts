import { MongoClient } from 'mongodb'

declare global {
  // eslint-disable-next-line no-var
  var __sweetLanaMongoClientPromise: Promise<MongoClient> | undefined
}

export function getMongoClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI is not configured')

  if (!global.__sweetLanaMongoClientPromise) {
    const client = new MongoClient(uri)
    const attempt = client.connect().catch((error: unknown) => {
      // Only clear this failed attempt; concurrent readers share its rejection.
      if (global.__sweetLanaMongoClientPromise === attempt) {
        global.__sweetLanaMongoClientPromise = undefined
      }
      throw error
    })
    global.__sweetLanaMongoClientPromise = attempt
  }

  return global.__sweetLanaMongoClientPromise
}
