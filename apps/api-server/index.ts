import 'module-alias/register';
import { register } from 'tsconfig-paths';
import dotenv from 'dotenv';
import { connectToDatabase } from '@repo/db';

dotenv.config({ path: '../../.env' });
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

import adminAuthMiddleware from '@util/middlewares/adminAuthMiddleware';
import { getLocalIP } from '@util/network-util';
// import shouldCompress from '@util/shouldCompress';
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
import rootRouter from './routers/rootRouter';
import fileRouter from './routers/fileRouter';
import GlobalStore from './store/GlobalStore';
import authRouter from './routers/authRouter';
import mainRouter from './routers/mainRouter';

const app = express();

const server = http.createServer(app); // Create an HTTP server

const dev = process.env.NODE_ENV !== 'production';

const runServer = () => {
  const baseDomain = process.env.NEXT_PUBLIC_PRODUCTION_URL;
  const wwwDomain = baseDomain && new URL(baseDomain).protocol + '//www.' + new URL(baseDomain).hostname;

  const allowedOrigins = [baseDomain, wwwDomain].filter(Boolean);

  const isDevelopment = process.env.NODE_ENV !== 'production';

  const isLocalhost =
    baseDomain &&
    (baseDomain.includes('localhost') ||
      baseDomain.includes(getLocalIP()) ||
      baseDomain.includes('192.168') ||
      baseDomain.includes('127.0.0.1'));

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
  app.use(fileUpload());
  app.use(cors(corsOptions));

  app.use(express.json({ limit: '5MB' }));
  app.use(cookieParser());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(xmlParser());
  // app.use(compression({ filter: shouldCompress }));
  app.use('/public/uploads', fileRouter);

  app.get('/api/admin/settings/clearCaches', adminAuthMiddleware, (req, res) => {
    //@ts-ignore
    apiCache.clear(req.params?.collection);
    res.json({ message: 'Deleting Cache Command Executed' });
  });

  app.get('/api/alive', loggerMiddleware, (req, res) => {
    console.log(`process.env.API_SERVER_PORT=> `, process.env.API_SERVER_PORT);
    console.log(`process.env.API_SERVER_PORT=> `, path.join(process.cwd(), 'public'));

    res.json({ message: 'alive' });
  });

  app.get('/alive', (req, res) => res.send('alive'));

  //----------------- Api routes handler-----------------------
  app.use('/wp/v2', mainRouter);

  app.use('/api/auth', authRouter);
  app.use('/api', rootRouter);

  //----------------- File routes handlers-----------------------

  // const staticPath = dev ? './static' : '../static';
  // const publicPath = dev ? './public' : '../public';
  // const publicPathFileServer = dev ? '../api-server/public' : '../../api-server/public';
  //  const publicPathFileServer = path.join(process.cwd(), 'public');

  // app.use(
  //   '/static',
  //   express.static(path.join(__dirname, staticPath), {
  //     maxAge: '604800000',
  //   }),
  // );
  //
  // app.use(
  //   '/public',
  //   express.static(path.join(__dirname, publicPath), {
  //     maxAge: '604800000',
  //   }),
  // );
  //
  // app.use(
  //   '/public',
  //   express.static(path.join(__dirname, publicPathFileServer), {
  //     maxAge: '604800000',
  //   }),
  // );
  //
  // app.use('/public/uploads', (req, res, next) => {
  //   const chunkSize = 10 ** 6 / 2; // 1MB
  //   const range = req.headers.range;
  //   const videoPath = path.join(__dirname, '/public/uploads/videos' + req.url);
  //
  //   let videoSize = 0;
  //
  //   try {
  //     videoSize = fs.statSync(videoPath).size;
  //   } catch (err) {
  //     return res.status(404).send('Video not found');
  //   }
  //
  //   // Handle requests without Range header - send first chunk with 206
  //   if (!range) {
  //     const start = 0;
  //     const end = Math.min(chunkSize - 1, videoSize - 1);
  //     const contentLength = end - start + 1;
  //
  //     const headers = {
  //       'Content-Range': `bytes ${start}-${end}/${videoSize}`,
  //       'Accept-Ranges': 'bytes',
  //       'Content-Length': contentLength,
  //       'Content-Type': 'video/mp4',
  //     };
  //
  //     res.writeHead(206, headers);
  //     const videoStream = fs.createReadStream(videoPath, { start, end });
  //     return videoStream.pipe(res);
  //   }
  //
  //   const start = Number(range.replace(/\D/g, ''));
  //   const end = Math.min(start + chunkSize, videoSize - 1);
  //   const contentLength = end - start + 1;
  //
  //   const headers = {
  //     'Content-Range': `bytes ${start}-${end}/${videoSize}`,
  //     'Accept-Ranges': 'bytes',
  //     'Content-Length': contentLength,
  //     'Content-Type': 'video/mp4',
  //   };
  //
  //   res.writeHead(206, headers);
  //   const videoStream = fs.createReadStream(videoPath, { start, end });
  //   videoStream.pipe(res);
  // });

  // app.use('/public/uploads/videos', (req, res, next) => {
  //   const range = req.headers.range;
  //   if (!range) {
  //     res.status(400).send('Range Header Missing');
  //   }
  //   let videoSize = 0;
  //   const videoPath = path.join(__dirname, '/public/uploads/videos' + req.url);
  //
  //   try {
  //     videoSize = fs.statSync(videoPath).size;
  //   } catch (err) {
  //     res.status(404);
  //   }
  //
  //   const chunkSize = 10 ** 6;
  //   const start = Number(range.replace(/\D/g, ''));
  //   const end = Math.min(start + chunkSize, videoSize - 1);
  //   const contentLength = end - start + 1;
  //   const headers = {
  //     'content-range': `bytes ${start}-${end}/$videoSize`,
  //     'Accept-range': 'bytes',
  //     'content-length': contentLength,
  //     'content-type': 'video/mp4',
  //   };
  //   res.writeHead(206, headers);
  //
  //   const videoStream = fs.createReadStream(videoPath, { start, end });
  //   videoStream.pipe(res);
  // });

  app.use(
    '/public',
    express.static(path.join(process.cwd(), 'public'), {
      maxAge: '604800000',
    }),
  );

  // app.use('/files/v1/', clientFileManagerMainRouter);

  //----------------- Serving Production Dashboard React App------------------------
  // const dashboardAppPath = dev ? '../web-dashboard-app/build' : '../../web-dashboard-app/build';
  // const dashboardBuiltPath = path.join(__dirname, dashboardAppPath);

  // app.use('/static', express.static(`${dashboardBuiltPath}/static`, { maxAge: '604800000' }));

  // app.get('/dashboard', (req, res) => {
  //   res.sendFile(`${dashboardBuiltPath}/index.html`);
  // });

  app.get('/', (req, res) => {
    res.redirect(process.env.NEXT_PUBLIC_PRODUCTION_URL);
  });

  // app.get('/dashboard/*', (req, res) => {
  //   res.sendFile(`${dashboardBuiltPath}/index.html`);
  // });

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

  io.on('connection', (socket) => {
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

//GlobalStore.connectToDatabase('API server')
connectToDatabase('API server').then(() => {
  runServer();
  initializeChatroomsToStore();
  // GlobalStore.setInitialSettings()
  // GlobalStore.setWidgets()
  GlobalStore.setServerStartupData();
  // GlobalStore.setSettings()
});
