import mongoose, { Mongoose } from 'mongoose';

const isDev = process.env.NODE_ENV !== 'production';

const MONGODB_URI: string = process.env.DB_USER
  ? `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
  : `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

if (!MONGODB_URI) {
  throw new Error('Database connection string is missing. Check environment variables.');
}

type MongooseCache = {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };
global.mongoose = cached;

const connectToDatabase = async (connectorName: string = '', connectionUri: string = undefined): Promise<Mongoose> => {
  // Check if connection exists and is ready
  if (cached.conn && cached.conn.connection.readyState === 1) {
    if (isDev) {
      console.log('\x1b[33m%s\x1b[0m', `${connectorName} * Using cached database connection *`);
    }
    return cached.conn;
  }

  // Clean up stale connections
  if (cached.conn && cached.conn.connection.readyState !== 1) {
    if (isDev) {
      console.log('\x1b[33m%s\x1b[0m', `${connectorName} * Cleaning up stale connection *`);
    }
    cached.conn = null;
    cached.promise = null;
  }

  if (!cached.promise) {
    if (isDev) {
      console.log('\x1b[33m%s\x1b[0m', `${connectorName} * Establishing new database connection *`);
    }

    const opts = {
      bufferCommands: false,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6
      maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
    };

    cached.promise = mongoose.connect(connectionUri || MONGODB_URI, opts).then((mongoose) => {
      if (isDev) {
        console.log('\x1b[33m%s\x1b[0m', `${connectorName} * Connected to Database *`);
      }

      // Handle connection events
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
    throw error; // Throw instead of process.exit in serverless
  }

  return cached.conn;
};

export default connectToDatabase;


//-------OLD CODE-----
// import mongoose, { Mongoose } from 'mongoose';
//
// const isDev = process.env.NODE_ENV !== 'production';
//
// const MONGODB_URI: string = process.env.DB_USER
//   ? `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
//   : `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
//
// if (!MONGODB_URI) {
//   throw new Error('Database connection string is missing. Check environment variables.');
// }
//
// type MongooseCache = {
//   conn: Mongoose | null;
//   promise: Promise<Mongoose> | null;
// };
//
// declare global {
//   var mongoose: MongooseCache | undefined;
// }
//
// let cached: MongooseCache = global.mongoose || { conn: null, promise: null };
//
// global.mongoose = cached;
//
// const connectToDatabase = async (connectorName: string = '', connectionUri:string = undefined): Promise<Mongoose> => {
//
//   if (cached.conn) {
//     if (isDev) {
//       console.log('\x1b[33m%s\x1b[0m', `${connectorName} * Using cached database connection *`);
//     }
//     return cached.conn;
//   }
//
//   if (!cached.promise) {
//     if (isDev) {
//       console.log('\x1b[33m%s\x1b[0m', `${connectorName} * Establishing new database connection *`);
//     }
//
//     const opts = {
//       bufferCommands: false,
//     };
//
//     cached.promise = mongoose.connect(connectionUri || MONGODB_URI, opts).then((mongoose) => {
//       if (isDev) {
//         console.log('\x1b[33m%s\x1b[0m', `${connectorName} * Connected to Database *`);
//       }
//
//       return mongoose;
//     });
//   }
//
//   try {
//     cached.conn = await cached.promise;
//   } catch (error) {
//     cached.promise = null;
//     if (isDev) {
//       console.error('Error connecting to Database', error);
//     }
//
//     process.exit(1);
//   }
//
//   return cached.conn;
// };
//
// export default connectToDatabase;
//
