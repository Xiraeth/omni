import mongoose, { Connection, ConnectOptions } from "mongoose";

/**
 * Type definition for mongoose connection cache
 * @property conn - The mongoose connection instance
 * @property promise - Promise of pending connection
 */
type MongooseCache = {
  conn: Connection | null;
  promise: Promise<Connection> | null;
};

/**
 * MongoDB connection options
 */
interface MongoDbOptions extends ConnectOptions {
  bufferCommands: boolean;
  autoIndex: boolean;
  retryWrites: boolean;
}

// Global type declaration for development environment
declare global {
  var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Default MongoDB connection options
 */
const defaultOptions: MongoDbOptions = {
  bufferCommands: false,
  autoIndex: true,
  retryWrites: true,
};

/**
 * Validates MongoDB URI and initializes connection cache
 */
function initializeCache(): MongooseCache {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not defined");
  }

  return global.mongoose || { conn: null, promise: null };
}

// Initialize connection cache
let cached: MongooseCache = initializeCache();

if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Establishes and manages connection to MongoDB
 * @returns Promise<Connection> - MongoDB connection instance
 * @throws Error if connection fails
 */
async function dbConnect(): Promise<Connection> {
  try {
    // Return existing connection if available
    if (cached.conn) {
      if (cached.conn.readyState === 1) {
        return cached.conn;
      }
      // If connection is closed, clear cache
      cached.conn = null;
      cached.promise = null;
    }

    // Create new connection if no existing promise
    if (!cached.promise) {
      cached.promise = mongoose
        .connect(MONGODB_URI!, defaultOptions)
        .then((mongoose) => {
          console.info("Successfully connected to MongoDB.");
          return mongoose.connection;
        })
        .catch((error) => {
          console.error("MongoDB connection error:", error);
          throw error;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw new Error(
      `Failed to connect to MongoDB: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export default dbConnect;
