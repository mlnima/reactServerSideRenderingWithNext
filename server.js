require('dotenv').config()
// require('./server/_variables/connectToDatabase')
// require('./server/_variables/_setSettingToEnvironmentVariables').finally()
// require('./server/_variables/_writeSettingsAndStaticWidgetsToJsonFile').finally()
require('./server/_variables/connectToDatabase').then(()=>{
    // require('./server/_variables/_writeSettingsAndStaticWidgetsToJsonFile').finally()
})
require('./server/workers/mailServer')

// const cluster = require('cluster')
// const os = require('os')
const express = require('express');

const next = require('next');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const path = require('path');
const adminAuthMiddleware = require('./server/middlewares/adminAuthMiddleware');
const xmlParser = require("express-xml-bodyparser");
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();
const apiCache = require('apicache');

const cors = require('cors');
const compression = require('compression');
const shouldCompress = require('./server/_variables/shouldCompress');
const cacheSuccesses = require('./server/middlewares/apiCache');
const adminMainRouter = require('./server/controllers/adminControllers/adminMainRouter');
const clientMainRouter = require('./server/controllers/clientControllers/clientMainRouter');
const clientMainFestController = require('./server/controllers/clientControllers/clientMainFestController');
const clientRobotTxtController = require('./server/controllers/clientControllers/clientRobotTxtController');
//--sitemap Controllers
const siteMapController = require('./server/controllers/sitemapControllers/siteMapController');
const siteMapsController = require('./server/controllers/sitemapControllers/siteMapsController');
const subSiteMapsController = require('./server/controllers/sitemapControllers/subSiteMapsController');
const metaSitemapController = require('./server/controllers/sitemapControllers/metaSitemapController');
const pageSitemapController = require('./server/controllers/sitemapControllers/pageSitemapController');
const searchSitemapController = require('./server/controllers/sitemapControllers/searchSitemapController');

const staticServeOptions = {
    root: './static/',
    headers: {'Content-Type': 'text/plain;charset=utf-8'}
}

const runServer = () => {
    const server = express();
    server.use(cors())

    server.listen(process.env.PORT || 3000, err => {
        if (err) throw err
        console.log(`process ${process.pid} : server ${process.env.PORT || 3000} `)
    } )
    server.use(cookieParser());
    server.use(fileUpload());
    // server.use(middleware());
    server.use(bodyParser.json());
    server.use(xmlParser());
    server.use(compression({filter: shouldCompress}));
    server.use('/static', express.static(path.join(__dirname, 'static'),{maxAge: "604800000"}))
    server.use('/public', express.static(path.join(__dirname, 'public'),{maxAge: "604800000"}))
    server.get('/api/admin/settings/clearCaches', adminAuthMiddleware, (req, res) => {
        apiCache.clear(req.params.collection)
        res.json({message:'Deleting Cache Command Executed'})

    });
    server.get('/robots.txt', (req, res) => clientRobotTxtController(req, res));
    server.get('/manifest.json', cacheSuccesses,(req,res)=>clientMainFestController(req,res))
    //xml siteMap routes
    server.get('/sitemap.xsl', (req, res) => {return res.status(200).sendFile('sitemap.xsl', staticServeOptions)});
    server.get('/sitemap.xml',cacheSuccesses, (req, res) => siteMapController.siteMap(req , res));
    server.get('/sitemap',cacheSuccesses, (req, res) => siteMapController.siteMap(req , res));
    server.get('/sitemaps/search.xml',cacheSuccesses, (req, res) => searchSitemapController(req , res));
    server.get('/sitemaps/actors.xml',cacheSuccesses, (req, res) => metaSitemapController.actors(req , res));
    server.get('/sitemaps/categories.xml',cacheSuccesses, (req, res) => metaSitemapController.categories(req , res));
    server.get('/sitemaps/tags.xml',cacheSuccesses, (req, res) => metaSitemapController.tags(req , res));
    server.get('/sitemaps/pages.xml',cacheSuccesses, (req, res) => pageSitemapController(req , res));
    server.get('/sitemaps/:month',cacheSuccesses, (req, res) => siteMapsController.siteMapMonths(req , res));
    server.get('/sitemap/:month/:pageNo',cacheSuccesses, (req, res) => subSiteMapsController.subSiteMapsController(req , res));

    //api routes
    server.use('/api/admin',adminMainRouter);
    server.use('/api/v1',clientMainRouter);

    //server.get('*',  (req, res) => handle(req, res));
    server.get('*', cacheSuccesses, (req, res) => handle(req, res));

}

app.prepare().then(()=>runServer()).catch((ex) => {
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




