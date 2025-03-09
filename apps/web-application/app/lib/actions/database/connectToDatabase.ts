import 'server-only';
import mongoose, { Mongoose } from 'mongoose';

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

let cached: MongooseCache = global?.mongoose || { conn: null, promise: null };

global.mongoose = cached;

const connectToDatabase = async (connectorName: string = ''): Promise<Mongoose> => {
  if (cached.conn) {
    console.log('\x1b[33m%s\x1b[0m', `${connectorName} * Using cached database connection *`);
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('\x1b[33m%s\x1b[0m', `${connectorName} * Establishing new database connection *`);
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('\x1b[33m%s\x1b[0m', `${connectorName} * Connected to Database *`);
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error('Error connecting to Database', error);
    process.exit(1);
  }

  return cached.conn;
};

export default connectToDatabase;















// const connectToDatabase = async (connectorName?: string) => {
//   try {
//     console.log('\x1b[33m%s\x1b[0m',`${connectorName || ''}* trying connected to Database *`, );
//     const dbUser = process.env.DB_USER ? `${process.env.DB_USER}:` : '';
//     const dbPass = process.env.DB_PASS ? `${process.env.DB_PASS}@` : '';
//     const dbHost = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';
//     const dbConnectQuery = `mongodb://${dbUser}${dbPass}${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
//
//     await mongoose.connect(dbConnectQuery);
//     console.log('\x1b[33m%s\x1b[0m',`${connectorName || ''}* connected to Database *`, );
//   } catch (error) {
//     console.error('Error connecting to Database', error);
//     process.exit(1);
//   }
// };
//
// export default connectToDatabase;

// https://mongoosejs.com/docs/nextjs.html
//console.log(`mongoDBConnectionQueryGenerator()=> `, dbConnectQuery);