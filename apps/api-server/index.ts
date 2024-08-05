import 'module-alias/register';
import { register } from 'tsconfig-paths';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
const baseUrl = __dirname; // usually __dirname
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
import GlobalStore from "@store/GlobalStore";
import adminAuthMiddleware from '@util/middlewares/adminAuthMiddleware';
import { getLocalIP } from '@util/network-util';
import shouldCompress from '@util/shouldCompress';
import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import xmlParser from 'express-xml-bodyparser';
import apiCache from 'apicache';
import cors from 'cors';
import compression from 'compression';
import path from 'path';
import http from 'http';
// import cacheSuccesses from './middlewares/apiCache';
import loggerMiddleware from './middlewares/loggerMiddleware';
import { initializeSocket } from './controllers/socketController/socketController';
import initializeChatroomsToStore from './controllers/socketController/initializeChatroomsToStore';
import { createProxyMiddleware } from 'http-proxy-middleware';
import rootRouter from "./routers/rootRouter";

// Create an Express application
const app = express();
const server = http.createServer(app); // Create an HTTP server

const dev = process.env.NODE_ENV !== 'production';

declare global {
    namespace Express {
        interface Request {
            userData?: { _id: string };
        }
    }
}

const runServer = () => {
    const baseDomain = process.env.NEXT_PUBLIC_PRODUCTION_URL;
    const wwwDomain =
        baseDomain && new URL(baseDomain).protocol + '//www.' + new URL(baseDomain).hostname;

    const allowedOrigins = [baseDomain, wwwDomain].filter(Boolean);

    const isDevelopment = process.env.NODE_ENV !== 'production';

    const isLocalhost =
        baseDomain &&
        (baseDomain.includes('localhost') ||
            baseDomain.includes(getLocalIP()) ||
            baseDomain.includes('192.168') ||
            baseDomain.includes('127.0.0.1'))

    const corsOptions = {
        origin: function (origin: string, callback: (arg0: Error, arg1: boolean) => void) {
            if (isDevelopment || isLocalhost) {
                callback(null, true); // Allow any origin in development or if baseDomain is localhost
            } else if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'), false);
            }
        },
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        // allowedHeaders: ['Content-Type', 'Authorization']
    };

    app.use(cors(corsOptions));


    app.use(express.json({ limit: '5MB' }));
    app.use(cookieParser());
    app.use(fileUpload());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    // app.use(bodyParser());
    // app.use(bodyParser.urlencoded({ extended: false }))
    // app.use(bodyParser.json());

    app.use(xmlParser());
    app.use(compression({ filter: shouldCompress }));

    app.get('/api/admin/settings/clearCaches', adminAuthMiddleware, (req, res) => {
        //@ts-ignore
        apiCache.clear(req.params?.collection);
        res.json({ message: 'Deleting Cache Command Executed' });
    });

    app.get('/api/alive', loggerMiddleware, (req, res) => {
        res.json({ message: 'alive' });
    });

    app.get('/alive', (req, res) => res.send('alive'));

    //----------------- Api routes handler-----------------------

    app.use('/api', rootRouter);


    // app.use('/api/admin', adminMainRouter);
    // app.use('/api/v1', loggerMiddleware, clientMainRouter);

    //----------------- File routes handlers-----------------------

    const staticPath = dev ? './static' : '../static';
    const publicPath = dev ? './public' : '../public';
    const publicPathFileServer = dev ? '../api-server/public' : '../../api-server/public';
    app.use(
        '/static',
        express.static(path.join(__dirname, staticPath), {
            maxAge: '604800000',
        }),
    );
    app.use(
        '/public',
        express.static(path.join(__dirname, publicPath), {
            maxAge: '604800000',
        }),
    );
    app.use(
        '/public',
        express.static(path.join(__dirname, publicPathFileServer), {
            maxAge: '604800000',
        }),
    );

    // app.use('/files/v1/', clientFileManagerMainRouter);

    //----------------- Serving Production Dashboard React App------------------------
    const dashboardAppPath = dev ? '../web-dashboard-app/build' : '../../web-dashboard-app/build';
    const dashboardBuiltPath = path.join(__dirname, dashboardAppPath);

    app.use('/static', express.static(`${dashboardBuiltPath}/static`, { maxAge: '604800000' }));

    app.get('/dashboard', (req, res) => {
        res.sendFile(`${dashboardBuiltPath}/index.html`);
    });

    if (dev) {
        app.get(
            '/',
            createProxyMiddleware({
                target: `http://localhost:3008`,
                changeOrigin: true,
            }),
        );
    } else {
        //in case of direct request to ip and api server port user will redirect to production url
        app.get('/', (req, res) => {
            res.redirect(process.env.NEXT_PUBLIC_PRODUCTION_URL);
        });
    }

    app.get('/', (req, res) => {});
    app.get('/dashboard/*', (req, res) => {
        res.sendFile(`${dashboardBuiltPath}/index.html`);
    });

    const io = require('socket.io')(server, {
        origin: [process.env.NEXT_PUBLIC_PRODUCTION_URL, '*'],
        cors: true,
        handlePreflightRequest: (req, res) => {
            res.writeHead(200, {
                'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_PRODUCTION_URL,
                'Access-Control-Allow-Methods': 'GET,POST',
                'Access-Control-Allow-Headers': 'my-custom-header',
                'Access-Control-Allow-Credentials': true,
            });
            res.end();
        },
    });

    io.on('connection', socket => {
        console.log(`New client connected: ${socket.id}`);
        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });

    initializeSocket(io);
    //---------------------------------------------------------------------------------
    // Start the server
    const serverPort = parseInt(process.env.API_SERVER_PORT || '3002');
    server.listen(serverPort, () => {
        console.log(`process ${process.pid} : API server started at ${serverPort}`);
    });
};

GlobalStore.connectToDatabase('API server').then(() => {
    runServer();
    initializeChatroomsToStore();
    // GlobalStore.setInitialSettings()
    // GlobalStore.setWidgets()
    GlobalStore.setServerStartupData()
    // GlobalStore.setSettings()
});

