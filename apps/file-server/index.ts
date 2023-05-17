import dotenv from 'dotenv';

dotenv.config({path: '../../.env'});
import {connectToDatabase, shouldCompress} from 'custom-server-util';

connectToDatabase('Express Server')
import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import xmlParser from 'express-xml-bodyparser';
import cors from 'cors';
import compression from 'compression';
import clientFileManagerMainRouter
    from './controllers/clientControllers/fileManagerControllers/clientFileManagerMainRouter';
import path from 'path';

const server = express();
const dev = process.env.NODE_ENV !== 'production';

const runServer = () => {
    try {
        server.use(cors())
        server.use(express.json({limit: '2MB'}));
        server.use(cookieParser());
        server.use(fileUpload());
        server.use(bodyParser.json());
        server.use(xmlParser());
        server.use(compression({filter: shouldCompress}));

        //serving file from file and api server
        const staticPath = dev ? './static' : '../static';
        const publicPath = dev ? './public' : '../public';
        const publicPathFileServer = dev ? '../api-server/public' : '../../api-server/public';
        server.use('/static', express.static(path.join(__dirname, staticPath), {maxAge: "604800000"}));
        server.use('/public', express.static(path.join(__dirname, publicPath), {maxAge: "604800000"}));
        server.use('/public', express.static(path.join(__dirname, publicPathFileServer), {maxAge: "604800000"}));
        //serving dashboard React app
        const dashboardAppPath = dev ? '../web-dashboard-app/build' : '../../web-dashboard-app/build';
        const dashboardBuiltPath = path.join(__dirname, dashboardAppPath)
        server.use('/static', express.static(`${dashboardBuiltPath}/static`, {maxAge: "604800000"}));

        server.get('/dashboard', (req, res) => {
            res.sendFile(`${dashboardBuiltPath}/index.html`);
        })
        server.get('/dashboard/*', (req, res) => {
            res.sendFile(`${dashboardBuiltPath}/index.html`);
        })

        // const publicPath = dev ? './public' : '../public';
        // server.use('/public', express.static(path.join(__dirname, publicPath), {maxAge: "604800000"}));

        server.get('/files/alive', (req, res) => {
            res.json({message: 'alive'})
        });

        server.use('/files/v1/', clientFileManagerMainRouter);

        server.listen(process.env.FILE_SERVER_PORT || 3003, () => {
            console.log(`process ${process.pid} : file server started at ${process.env.FILE_SERVER_PORT || 3003} `);
        })
    } catch (error) {
        console.log('console error=> ', error)
    }

}

runServer()