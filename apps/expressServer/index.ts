import dotenv from 'dotenv';

dotenv.config({path: '../../.env'});
import connectToDatabase from 'custom-server-util/src/connectToDatabase';
//from "@_variables/variables";
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
import shouldCompress from 'custom-server-util/src/shouldCompress';
import cacheSuccesses from './middlewares/apiCache';
import adminMainRouter from './controllers/adminControllers/adminMainRouter';
import clientMainRouter from './controllers/clientControllers/clientMainRouter';
import clientMainFestController from './controllers/clientControllers/clientMainFestController'
import clientRobotTxtController from './controllers/clientControllers/clientRobotTxtController'
import rootSitemap from "./controllers/sitemapControllers/rootSiteMap";
import {monthSitemapController} from "./controllers/sitemapControllers/siteMapsController";
import {categories, tags, actors} from './controllers/sitemapControllers/metaSitemapController'
import pageSitemapController from './controllers/sitemapControllers/pageSitemapController'
import {searchSitemapController} from './controllers/sitemapControllers/searchSitemapController'
import loggerMiddleware from "./middlewares/loggerMiddleware";

const server = express();
const dev = process.env.NODE_ENV !== 'production';
const staticServeOptions = {
    root: './static/',
    headers: {'Content-Type': 'text/plain;charset=utf-8'}
}

const runServer = () => {

    server.use(cors())
    server.use(cookieParser());
    server.use(fileUpload());
    server.use(bodyParser.json());
    server.use(xmlParser());
    server.use(compression({filter: shouldCompress}));

    const staticPath = dev ? '../static' : '../../static'
    const publicPath = dev ? '../public' : '../../public'

    server.use('/static', express.static(path.join(__dirname, staticPath), {maxAge: "604800000"}))
    server.use('/public', express.static(path.join(__dirname, publicPath), {maxAge: "604800000"}))

    server.get('/api/admin/settings/clearCaches', adminAuthMiddleware, (req, res) => {
        //@ts-ignore
        apiCache.clear(req.params?.collection)
        res.json({message: 'Deleting Cache Command Executed'})
    });

    server.get('/robots.txt', (req, res) => clientRobotTxtController(req, res));
    server.get('/alive', (req, res) => res.send('alive'));
    server.get('/manifest.json', cacheSuccesses, (req, res) => clientMainFestController(req, res))
    //xml siteMap routes
    server.get('/sitemap.xsl', (req, res) => res.status(200).sendFile('sitemap.xsl', staticServeOptions));
    server.get('/sitemap.xml', cacheSuccesses, (req, res) => rootSitemap(req, res));
    server.get('/sitemap', cacheSuccesses, (req, res) => rootSitemap(req, res));
    server.get('/sitemap-tax-categories-(*.xml)', cacheSuccesses, (req, res) => categories(req, res));
    server.get('/sitemap-tax-tags-(*.xml)', cacheSuccesses, (req, res) => tags(req, res));
    server.get('/sitemap-tax-actors-(*.xml)', cacheSuccesses, (req, res) => actors(req, res));
    server.get('/sitemap-tax-search-(*.xml)', cacheSuccesses, (req, res) => searchSitemapController(req, res));
    server.get('/sitemap-pt-post-(*.xml)', cacheSuccesses, (req, res) => monthSitemapController(req, res));
    server.get('/sitemap-pt-page(-*.xml)', cacheSuccesses, (req, res) => pageSitemapController(req, res));
    //api routes
    server.use('/api/admin', adminMainRouter);
    server.use('/api/v1', loggerMiddleware, clientMainRouter);


    server.listen(process.env.API_SERVER_PORT || 3001, () => {
        console.log(`process ${process.pid} : api server started at ${process.env.API_SERVER_PORT || 3001} `)
    })
}

runServer()



