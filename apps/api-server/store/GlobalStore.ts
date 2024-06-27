import settingSchema from "@schemas/settingSchema";
import mongoose from 'mongoose';
import defaultInitialSettings from '../tools/asset/defaultInitialSettings';
import * as process from "process";

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true);

class GlobalStore {

    initialSettings: any
    constructor() {
        this.initialSettings  = {};
    }
    async connectToDatabase(connectorName?: string){
        try {
            const dbUser = process.env.DB_USER ? `${process.env.DB_USER}:` : '';
            const dbPass = process.env.DB_PASS ? `${process.env.DB_PASS}@` : '';
            const dbHost = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';
            const dbConnectQuery = `mongodb://${dbUser}${dbPass}${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

            console.log(`mongoDBConnectionQueryGenerator()=> `, dbConnectQuery);
            await mongoose.connect(dbConnectQuery);
            console.log(`${connectorName || ''}* connected to Database *`);
        }catch (error){
            console.log('Error connecting to Database', error);
            process.exit(1);
        }
    }

    async setInitialSettings(){
        try {
            const initialSettings = await settingSchema
                .findOne({ type: 'initialSettings' },null,{ lean: true })
                .exec();
            this.initialSettings = initialSettings.data;
        }catch (error){
            this.initialSettings = defaultInitialSettings.data;
        }
    }

    getInitialSettings(){
        return this.initialSettings
    }

    getLocales(){
        return process.env.NEXT_PUBLIC_LOCALES.split(' ')
    }

}


export default new GlobalStore()