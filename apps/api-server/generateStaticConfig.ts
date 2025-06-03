import * as dotenv from 'dotenv';
import * as path from 'path';
import { promises as fs } from 'fs';
dotenv.config({ path: '../../.env' });
import { settingSchema, connectToDatabase } from '@repo/db';

console.log(`---------------------generateStaticConfig=> `,)


//
// const connectToDatabase= async ()=>{
//     try {
//         const dbUser = process.env.DB_USER ? `${process.env.DB_USER}:` : '';
//         const dbPass = process.env.DB_PASS ? `${process.env.DB_PASS}@` : '';
//         const dbHost = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';
//         const dbConnectQuery = `mongodb://${dbUser}${dbPass}${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
//
//         console.log(`mongoDBConnectionQueryGenerator()=> `, dbConnectQuery);
//         await mongoose.connect(dbConnectQuery);
//         console.log(`generateStaticConfig * connected to Database *`);
//
//     } catch (error) {
//         console.log('Error connecting to Database', error);
//         process.exit(1);
//     }
// }



const generateStaticConfig = async () => {
    try {
       const MONGODB_URI: string = process.env.DB_USER
        ? `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
        : `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
        await connectToDatabase('generateStaticConfig',MONGODB_URI);
        const initialSettingsData = await settingSchema.findOne({ type: 'initialSettings' }).exec();
        const initialSettings = initialSettingsData?.data || {};
        const publicDirPath = path.join(process.cwd(), '../web-application/public');
        const filePath = path.join(publicDirPath, 'initialSettings.json');
        await fs.writeFile(filePath, JSON.stringify(initialSettings, null, 2), 'utf8');
        console.log('######Initial settings written to', filePath,'######');
    } catch (error) {
        console.error('######Error writing initial settings:', error,'######');
    }
};

generateStaticConfig().then(() => {
  process.exit(0);
});


