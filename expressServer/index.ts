import dotenv from 'dotenv';
dotenv.config();
import connectToDatabase from './_variables/connectToDatabase';
connectToDatabase('Express Server')

import express from 'express';
import next from 'next';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import path from 'path';
import adminAuthMiddleware from './middlewares/adminAuthMiddleware';
import xmlParser from 'express-xml-bodyparser';
import apiCache from 'apicache';
import cors from 'cors';
import compression from 'compression';
import shouldCompress from './_variables/shouldCompress';
import cacheSuccesses from './middlewares/apiCache';
import adminMainRouter from './controllers/adminControllers/adminMainRouter';
import clientMainRouter from './controllers/clientControllers/clientMainRouter';
import sitemapMainRouter from "./controllers/sitemapControllers/sitemapMainRouter";
import clientMainFestController from './controllers/clientControllers/clientMainFestController'
import clientRobotTxtController from './controllers/clientControllers/clientRobotTxtController'
// import siteMapController from './controllers/sitemapControllers/siteMapController'
// import siteMapsController from './controllers/sitemapControllers/siteMapsController'
// import subSiteMapsController from './controllers/sitemapControllers/subSiteMapsController'
// import metaSitemapController from './controllers/sitemapControllers/metaSitemapController'
// import pageSitemapController from './controllers/sitemapControllers/pageSitemapController'
// import searchSitemapController from './controllers/sitemapControllers/searchSitemapController'


const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

const staticServeOptions = {
    root: './static/',
    headers: {'Content-Type': 'text/plain;charset=utf-8'}
}

const runServer = () => {
    const server = express();
    server.use(cors())


    server.use(cookieParser());
    server.use(fileUpload());
    // expressServer.use(middleware());
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
    server.get('/manifest.json', cacheSuccesses, (req, res) => clientMainFestController(req, res))
    //xml siteMap routes
    server.get('/sitemap.xsl', (req, res) => {
        return res.status(200).sendFile('sitemap.xsl', staticServeOptions)
    });
    // server.get('/sitemap.xml', cacheSuccesses, (req, res) => siteMapController.siteMap(req, res));
    // server.get('/sitemap', cacheSuccesses, (req, res) => siteMapController.siteMap(req, res));
    // server.get('/sitemaps/search.xml', cacheSuccesses, (req, res) => searchSitemapController(req, res));
    // server.get('/sitemaps/actors.xml', cacheSuccesses, (req, res) => metaSitemapController.actors(req, res));
    // server.get('/sitemaps/categories.xml', cacheSuccesses, (req, res) => metaSitemapController.categories(req, res));
    // server.get('/sitemaps/tags.xml', cacheSuccesses, (req, res) => metaSitemapController.tags(req, res));
    // server.get('/sitemaps/pages.xml', cacheSuccesses, (req, res) => pageSitemapController(req, res));
    // server.get('/sitemaps/:month', cacheSuccesses, (req, res) => siteMapsController.siteMapMonths(req, res));
    // server.get('/sitemap/:month/:pageNo', cacheSuccesses, (req, res) => subSiteMapsController.subSiteMapsController(req, res));

    //api routes
    server.use('/sitemap.xml', sitemapMainRouter);
    server.use('/sitemap', sitemapMainRouter);
    server.use('/sitemaps', sitemapMainRouter);
    server.use('/api/admin', adminMainRouter);
    server.use('/api/v1', clientMainRouter);


    //rest of the routes
    server.get('*', cacheSuccesses, (req, res) => {
        return handle(req, res)
    });


    //@ts-ignore
    server.listen(process.env.PORT || 3000, error => {
        if (error) throw error
        console.log(`process ${process.pid} : server ${process.env.PORT || 3000} `)
    })


}

app.prepare().then(() => runServer()).catch((ex) => {
    console.log('exit error:', ex.stack)
});


// if (!process.env.CPU_CORES_ALLOW_TO_USE || process.env.NODE_ENV !== 'production'){
//     app.prepare().then(()=>runServer()).catch((ex) => {
//         console.log('exit error:', ex.stack)
//     });
// }else{
//     if (cluster.isMaster){
//         const numberOfCpus = os.cpus()?.length
//         const numberOfCpusToUse = parseInt(process.env.CPU_CORES_ALLOW_TO_USE) || 1
//
//         if (numberOfCpusToUse < numberOfCpus ){
//             [...Array(numberOfCpusToUse)].forEach(()=>{
//                 cluster.fork()
//             })
//         }
//     }else {
//
//         app.prepare().then(()=>runServer()).catch((ex) => {
//             console.log('exit error:', ex.stack)
//         });
//     }
// }




