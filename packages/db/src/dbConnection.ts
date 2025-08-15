import mongoose, { Mongoose } from 'mongoose';

const isDev = process.env.NODE_ENV !== 'production';

const MONGODB_URI: string = process.env.DB_USER
  ? `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
  : `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

if (!MONGODB_URI) {
  throw new Error('Database connection string is missing. Check environment variables.');
}

let cached = global.mongoose || { conn: null, promise: null };
global.mongoose = cached;

const connectToDatabase = async (connectorName: string = '', connectionUri: string = undefined): Promise<Mongoose> => {
  if (cached.conn && cached.conn.connection.readyState === 1) {
    return cached.conn;
  }

  if (cached.conn && cached.conn.connection.readyState !== 1) {
    cached.conn = null;
    cached.promise = null;
  }

  if (!cached.promise) {
    // if (isDev) {
    //   console.log('\x1b[33m%s\x1b[0m', `${connectorName} * MISS database Connection Cache *`);
    // }

    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
      maxIdleTimeMS: 5000,
    };

    cached.promise = mongoose.connect(connectionUri || MONGODB_URI, opts).then((mongoose) => {
      mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
        cached.conn = null;
        cached.promise = null;
      });

      mongoose.connection.on('disconnected', () => {
        if (isDev) {
          console.log('\x1b[33m%s\x1b[0m', `${connectorName} * MongoDB disconnected *`);
        }
        cached.conn = null;
        cached.promise = null;
      });

      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    cached.conn = null;
    if (isDev) {
      console.error('Error connecting to Database', error);
    }
    throw error;
  }

  return cached.conn;
};

export default connectToDatabase;
