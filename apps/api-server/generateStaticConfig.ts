// import 'module-alias/register';
// import { register } from 'tsconfig-paths';
//@ts-ignore
import dotenv from 'dotenv';
import { promises as fs } from 'fs';
dotenv.config({ path: '../../.env' });
// const baseUrl = __dirname;
// const cleanup = register({
//     baseUrl,
//     paths: {
//         '@_variables/*': ['./_variables/*'],
//         '@schemas/*': ['./schemas/*'],
//         '@util/*': ['./util/*'],
//         '@env/*': ['../../.env'],
//         '@store/*': ['./store/*'],
//     },
// });

import settingSchema from "./schemas/settingSchema";
import path from "path";
import GlobalStore from "./store/GlobalStore";
import mongoose from "mongoose";

const generateStaticConfig = async () => {
    try {
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


const connectToDatabase= async ()=>{
    try {
        const dbUser = process.env.DB_USER ? `${process.env.DB_USER}:` : '';
        const dbPass = process.env.DB_PASS ? `${process.env.DB_PASS}@` : '';
        const dbHost = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';
        const dbConnectQuery = `mongodb://${dbUser}${dbPass}${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

        console.log(`mongoDBConnectionQueryGenerator()=> `, dbConnectQuery);
        await mongoose.connect(dbConnectQuery);
        console.log(`generateStaticConfig * connected to Database *`);

    } catch (error) {
        console.log('Error connecting to Database', error);
        process.exit(1);
    }
}

connectToDatabase().then(()=>{
    generateStaticConfig().then(()=> {
        process.exit(0)
    })
})

