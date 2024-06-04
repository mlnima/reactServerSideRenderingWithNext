import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true);
export const mongoDBConnectionQueryGenerator = () => {
    const dbUser = process.env.DB_USER ? `${process.env.DB_USER}:` : '';
    const dbPass = process.env.DB_PASS ? `${process.env.DB_PASS}@` : '';
    return `mongodb://${dbUser}${dbPass}${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
};

export const connectToDatabase = async (connectorName?: string) => {
    try {
console.log(`mongoDBConnectionQueryGenerator()=> `,mongoDBConnectionQueryGenerator())
        await mongoose.connect(mongoDBConnectionQueryGenerator());
        console.log(`${connectorName || ''}* connected to Database *`);
    } catch (error) {
        console.log('Error connecting to Database', error);
        process.exit(1);
    }
};
