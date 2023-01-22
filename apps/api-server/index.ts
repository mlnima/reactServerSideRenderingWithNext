import dotenv from 'dotenv';

dotenv.config({path: '../../.env'});
import {connectToDatabase} from 'custom-server-util';

connectToDatabase('Express Server')
import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import path from 'path';
import adminAuthMiddleware from './middlewares/adminAuthMiddleware';
import xmlParser from 'express-xml-bodyparser';
import apiCache from 'apicache';
import cors from 'cors';
import compression from 'compression';
import {shouldCompress} from 'custom-server-util';
import cacheSuccesses from './middlewares/apiCache';
import adminMainRouter from './controllers/adminControllers/adminMainRouter';
import clientMainRouter from './controllers/clientControllers/clientMainRouter';
import clientMainFestController from './controllers/clientControllers/clientMainFestController'
import clientRobotTxtController from './controllers/clientControllers/clientRobotTxtController'
import loggerMiddleware from "./middlewares/loggerMiddleware";

const server = express();
const dev = process.env.NODE_ENV !== 'production';

const runServer = () => {

    server.use(cors({
        // origin: process.env.NEXT_PUBLIC_PRODUCTION_URL,
        // credentials: !dev,
    }))
    server.use(express.json({ limit: '2MB' }));
    server.use(cookieParser());
    server.use(fileUpload());
    server.use(bodyParser.json());
    server.use(xmlParser());
    server.use(compression({filter: shouldCompress}));

    server.get('/api/admin/settings/clearCaches', adminAuthMiddleware, (req, res) => {
        //@ts-ignore
        apiCache.clear(req.params?.collection)
        res.json({message: 'Deleting Cache Command Executed'})
    });


    const staticPath = dev ? './static' : '../static';
    const publicPath = dev ? './public' : '../public';
    const dashboardAppPath = dev ? '../web-dashboard-app/build' : '../../web-dashboard-app/build';
    const dashboardBuiltPath = path.join(__dirname, dashboardAppPath)




    server.use('/static', express.static(path.join(__dirname, staticPath), {maxAge: "604800000"}));
    server.use('/static', express.static(`${dashboardBuiltPath}/static`, {maxAge: "604800000"}));
    server.use('/public', express.static(path.join(__dirname, publicPath), {maxAge: "604800000"}));

    server.get('/dashboard', (req, res) => {
        res.sendFile(`${dashboardBuiltPath}/index.html`);
    })
    server.get('/dashboard/*', (req, res) => {
        res.sendFile(`${dashboardBuiltPath}/index.html`);
    })

    server.get('/api/alive', loggerMiddleware, (req, res) => {
        res.json({message: 'alive'})
    });



    server.post('/api', (req, res) => {
        res.send('*****************************I am the API Server*****************************')
    });

    server.get('/robots.txt', (req, res) => clientRobotTxtController(req, res));
    server.get('/alive', (req, res) => res.send('alive'));
    server.get('/manifest.json', cacheSuccesses, (req, res) => clientMainFestController(req, res));
    //api routes
    server.use('/api/admin', adminMainRouter);
    server.use('/api/v1', loggerMiddleware, clientMainRouter);

    server.listen(process.env.API_SERVER_PORT || 3001, () => {
        console.log(`process ${process.pid} : api server started at ${process.env.API_SERVER_PORT || 3001} `);
    })
}

runServer()

