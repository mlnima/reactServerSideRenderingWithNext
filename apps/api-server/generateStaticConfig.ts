import 'module-alias/register';
import { register } from 'tsconfig-paths';
import dotenv from 'dotenv';
import { promises as fs } from 'fs';
dotenv.config({ path: '../../.env' });
const baseUrl = __dirname;
const cleanup = register({
    baseUrl,
    paths: {
        '@_variables/*': ['./_variables/*'],
        '@schemas/*': ['./schemas/*'],
        '@util/*': ['./util/*'],
        '@env/*': ['../../.env'],
        '@store/*': ['./store/*'],
    },
});

import settingSchema from "@schemas/settingSchema";
import path from "path";
import GlobalStore from "@store/GlobalStore";

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


GlobalStore.connectToDatabase('build server').then(()=>{
    generateStaticConfig().then(()=> {
        process.exit(0)
    })
})

