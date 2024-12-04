import { MongoClient } from 'mongodb';

let client: MongoClient | null = null;

const connectToDatabase = async (connectorName?: string) => {
    try {
        const dbUser = process.env.DB_USER ? `${process.env.DB_USER}:` : '';
        const dbPass = process.env.DB_PASS ? `${process.env.DB_PASS}@` : '';
        const dbHost = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';
        const dbPort = process.env.DB_PORT || '27017';
        const dbName = process.env.DB_NAME || 'test';
        const dbConnectQuery = `mongodb://${dbUser}${dbPass}${dbHost}:${dbPort}/${dbName}`;

        console.log(`mongoDBConnectionQueryGenerator()=>`, dbConnectQuery);

        if (!client) {
            client = new MongoClient(dbConnectQuery);
            await client.connect();
            console.log(`${connectorName || ''}* connected to Database *`);
        }

        return client.db(dbName);
    } catch (error) {
        console.error('Error connecting to Database', error);
        process.exit(1);
    }
};

export default connectToDatabase;
