import mongoose from 'mongoose';

const connectToDatabase = async (connectorName?: string) => {
  try {
    const dbUser = process.env.DB_USER ? `${process.env.DB_USER}:` : '';
    const dbPass = process.env.DB_PASS ? `${process.env.DB_PASS}@` : '';
    const dbHost = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';
    const dbConnectQuery = `mongodb://${dbUser}${dbPass}${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

    console.log(`mongoDBConnectionQueryGenerator()=> `, dbConnectQuery);
    await mongoose.connect(dbConnectQuery);
    console.log(`${connectorName || ''}* connected to Database *`);
  } catch (error) {
    console.error('Error connecting to Database', error);
    process.exit(1);
  }
};

export default connectToDatabase;
