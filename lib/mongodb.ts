/**
 * lib/mongodb.ts
 *
 * Reusable, cached Mongoose connection for Next.js.
 * In development, Next.js hot-reloads modules, which would create a new
 * connection on every reload. We cache the promise on the Node.js global
 * object so the connection is reused across reloads.
 *
 * NEVER import this file in client components — MONGODB_URI is server-only.
 */

import mongoose, { ConnectOptions } from 'mongoose'
import dns from 'dns'

// Ensure reliable SRV DNS resolution for MongoDB Atlas across environments
try {
  dns.setServers(['8.8.8.8', '1.1.1.1'])
} catch {
  // Ignore in environments where setServers is restricted
}

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable in .env.local'
  )
}

/* ─── Extend the NodeJS global type to hold the cached connection ─────── */
declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  }
}

/* Initialise the cache slot once ---------------------------------------- */
if (!global._mongooseCache) {
  global._mongooseCache = { conn: null, promise: null }
}

const cache = global._mongooseCache

/* ─── Connect ───────────────────────────────────────────────────────────── */
export async function connectDB(): Promise<typeof mongoose> {
  // Return existing open connection immediately
  if (cache.conn) return cache.conn

  // If a connection is being established, wait for it
  if (!cache.promise) {
    const opts: ConnectOptions = {
      bufferCommands: false,
      dbName: 'samch_db',
      serverSelectionTimeoutMS: 4000,
      connectTimeoutMS: 4000,
    }

    cache.promise = mongoose.connect(MONGODB_URI, opts).then((m) => m)
  }

  try {
    cache.conn = await cache.promise
  } catch (err) {
    // Clear the promise so the next call will retry
    cache.promise = null
    throw err
  }

  return cache.conn
}

export default connectDB
