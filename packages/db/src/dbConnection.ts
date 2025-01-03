// import mongoose, { Mongoose } from 'mongoose';
//
// // Declare a global interface for the cached connection to avoid TypeScript errors
// declare global {
//   var mongoose: { conn: Mongoose | null; promise: Promise<Mongoose> | null };
// }
//
// // Initialize the cached connection globally to reuse it
// let cached = global.mongoose;
//
// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }
//
// const connectToDatabase = async (connectorName?: string): Promise<Mongoose> => {
//   if (cached.conn) {
//     return cached.conn;
//   }
//
//   if (!cached.promise) {
//     try {
//       const dbUser = process.env.DB_USER ? `${process.env.DB_USER}:` : '';
//       const dbPass = process.env.DB_PASS ? `${process.env.DB_PASS}@` : '';
//       const dbHost = process.env.DB_HOST || 'localhost';
//       const dbConnectQuery = `mongodb://${dbUser}${dbPass}${dbHost}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
//
//       cached.promise = mongoose.connect(dbConnectQuery).then((mongooseInstance) => {
//         console.log('\x1b[33m%s\x1b[0m', `${connectorName || ''}* connected to Database *`);
//         return mongooseInstance;
//       });
//     } catch (error) {
//       console.error('Error connecting to Database', error);
//       process.exit(1);
//     }
//   }
//
//   cached.conn = await cached.promise;
//   return cached.conn;
// };
//
// export default connectToDatabase;



import mongoose from 'mongoose';

const connectToDatabase = async (connectorName?: string) => {
  try {
    const dbUser = process.env.DB_USER ? `${process.env.DB_USER}:` : '';
    const dbPass = process.env.DB_PASS ? `${process.env.DB_PASS}@` : '';
    const dbHost = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';
    const dbConnectQuery = `mongodb://${dbUser}${dbPass}${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

    await mongoose.connect(dbConnectQuery);
    console.log('\x1b[33m%s\x1b[0m',`${connectorName || ''}* connected to Database *`, );
  } catch (error) {
    console.error('Error connecting to Database', error);
    process.exit(1);
  }
};

export default connectToDatabase;

// https://mongoosejs.com/docs/nextjs.html
//console.log(`mongoDBConnectionQueryGenerator()=> `, dbConnectQuery);