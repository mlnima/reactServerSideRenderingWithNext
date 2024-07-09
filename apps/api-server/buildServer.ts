import 'module-alias/register';
import { register } from 'tsconfig-paths';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import http from 'http';
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
import express from "express";
import GlobalStore from "@store/GlobalStore";
import cors from 'cors';
import SettingController from "./controllers/SettingController";


const app = express();
const server = http.createServer(app);

const runServer = () => {
    app.use(cors())
    app.get('/api/build/settings', SettingController.getSettings);
    app.get('/api/build/shutdown', (req,res)=>{
        try {
            server.close(() => {
                console.log('Build Server: Server closed');
                process.exit(0);
            });
        }catch (error){
            console.log(`Build Server:`,' Error Shutting Down' , error)
        }


    });

    const port =parseInt(process.env.PORT || '3000') + 9
    server.listen(port, () => {
        console.log(`###################### Build Server: started at ${port} ########################`);
    });
}


GlobalStore.connectToDatabase('build server').then(()=>{
    runServer()
})