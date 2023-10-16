// import dotenv from 'dotenv';
//
// dotenv.config({path: '../../.env'});
import {connectToDatabase, getLocalIP, shouldCompress} from 'custom-server-util';

connectToDatabase('Express Server')

import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import {adminAuthMiddleware} from 'custom-server-util';
import xmlParser from 'express-xml-bodyparser';
import apiCache from 'apicache';
import cors from 'cors';
import compression from 'compression';
import cacheSuccesses from './middlewares/apiCache';
import adminMainRouter from './controllers/adminControllers/adminMainRouter';
import clientMainRouter from './controllers/clientControllers/clientMainRouter';
import clientMainFestController from './controllers/clientControllers/clientMainFestController'
import clientRobotTxtController from './controllers/clientControllers/clientRobotTxtController'
import loggerMiddleware from "./middlewares/loggerMiddleware";

import {settingSchema} from 'models';
import * as process from "process";
import syncAllIndexes from "./tools/syncModelsIndexes";

// syncAllIndexes()


settingSchema.findOne({type: 'initialSettings'}).exec().then((initialSettings) => {
    if (initialSettings) {
        global.initialSettings = initialSettings.data
    }
})






const server = express();

const runServer = () => {

// Base URL from environment variable
    const baseDomain = process.env.NEXT_PUBLIC_PRODUCTION_URL;

// Generate the "www" version of the domain if the base domain exists
    const wwwDomain = baseDomain && new URL(baseDomain).protocol + '//www.' + new URL(baseDomain).hostname;

    const allowedOrigins = [baseDomain, wwwDomain].filter(Boolean);

    const isDevelopment = process.env.NODE_ENV !== 'production';
    const isLocalhost = baseDomain && (
        baseDomain.includes('localhost') ||
        baseDomain.includes(getLocalIP()) ||
        baseDomain.includes('127.0.0.1')
    );

    const corsOptions = {
        origin: function (origin, callback) {
            if (isDevelopment || isLocalhost) {
                callback(null, true); // Allow any origin in development or if baseDomain is localhost
            } else if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        // allowedHeaders: ['Content-Type', 'Authorization']
    };

// Use the CORS middleware
    server.use(cors(corsOptions));

    server.use(cors())
    server.use(express.json({limit: '5MB'}));
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

    server.get('/api/alive', loggerMiddleware, (req, res) => {
        res.json({message: 'alive'})
    });

    server.get('/robots.txt', (req, res) => clientRobotTxtController(req, res));
    server.get('/alive', (req, res) => res.send('alive'));
    server.get('/manifest.json', cacheSuccesses, (req, res) => clientMainFestController(req, res));
    //api routes
    server.use('/api/admin', adminMainRouter);
    server.use('/api/v1', loggerMiddleware, clientMainRouter);

    server.listen(process.env.API_SERVER_PORT || 3002, () => {
        console.log(`process ${process.pid} : api server started at ${process.env.API_SERVER_PORT || 3002} `);
    })
}

runServer()

