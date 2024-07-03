import settingSchema from "@schemas/settingSchema";
import mongoose from 'mongoose';
import defaultInitialSettings from '../tools/asset/defaultInitialSettings';
import { exec } from'child_process';
import * as process from "process";
import path from "path";
import {Worker} from "worker_threads";

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

    getCardAmountPerPage(){
        return this.initialSettings?.layoutSettings?.numberOfCardsPerPage
    }

    getLocales(){
        return process.env.NEXT_PUBLIC_LOCALES.split(' ')
    }
    getLocalesExceptDefault(){
        return process.env.NEXT_PUBLIC_LOCALES.replace(process.env.NEXT_PUBLIC_DEFAULT_LOCALE ,'').split(' ')
    }

    async execCommand(command:string){
        try {
            const workerPath = path.join(__dirname,'../workers/commandExecutor/worker.js') ;

            const worker = new Worker(
                workerPath,
                {workerData:{command}}
            )

            worker.once('message',result =>{
                worker.postMessage({ exit: true })
                return result.response
            })

            worker.on('error', error => {
                console.log('error:',error);
            });

            worker.on('exit', exitCode => {
                console.log('exitCode : ',exitCode);
            })

        }catch (err){
            console.log(err)
        }
    }

}


export default new GlobalStore()