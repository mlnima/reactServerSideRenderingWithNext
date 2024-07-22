import settingSchema from "@schemas/settingSchema";
import mongoose from 'mongoose';
import defaultInitialSettings from '../tools/asset/defaultInitialSettings';
import path from "path";
import {Worker} from "worker_threads";
import {Widget} from "typescript-types";
import widgetSchema from "@schemas/widgetSchema";
import {postFieldRequestForCards} from "@repo/data-structures";

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true);

class GlobalStore {

    initialSettings: any
    widgets:{
        [key:string]:Widget[]
    }

    constructor() {
        this.initialSettings  = {};
        this.widgets = {}
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

    async setWidgets(){

        const allWidgets = await widgetSchema.find({
            'data.position': { $nin: ['deactivated', 'trash'] }
        }).populate([
            {
                model: 'meta',
                path: 'data.uniqueData.metaData',
            },
            {
                model: 'post',
                path: 'data.uniqueData.posts',
                select: [...postFieldRequestForCards, `translations`],
                populate: {
                    path: 'thumbnail',
                    select: 'filePath',
                },
            }
        ]).lean().exec();

        this.widgets = allWidgets.reduce((widgetInPositions: any, widget: Widget) => {
            widgetInPositions[widget.data.position] = [
                ...(widgetInPositions[widget.data.position] || []),
                widget,
            ];
            return widgetInPositions;
        }, {});
    }

    getWidgets(positions:string[],locale?:string){
        return positions.reduce((result, position) => {
            result[position] = this.widgets?.[position] || [];
            return result;
        }, {});
    }

    getInitialSettings(){
        return this.initialSettings
    }

    getCardAmountPerPage(){
        return this.initialSettings?.contentSettings?.numberOfCardsPerPage
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