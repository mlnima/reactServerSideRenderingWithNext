require('dotenv').config()
require('./server/_variables/connectToDatabase')

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
const siteMapController = require('./server/controllers/siteMapController');
const siteMapsController = require('./server/controllers/siteMapsController');
const subSiteMapsController = require('./server/controllers/subSiteMapsController');

const staticServeOptions = {
    root: './static/',
    headers: {'Content-Type': 'text/plain;charset=utf-8'}
}

app.prepare().then(() => {
    const server = express();
    server.use(cors())
    server.listen(process.env.REACT_APP_PORT || 3000, err => err ?  err : console.log(`server run on ${process.env.REACT_APP_PORT || 3000}`) )
    server.use(cookieParser());
    server.use(fileUpload());
    server.use(bodyParser.json());
    server.use(xmlParser());
    server.use(compression({filter: shouldCompress}));
    server.use('/static', express.static(path.join(__dirname, 'static'),{maxAge: "365d"}))
    server.use('/public', express.static(path.join(__dirname, 'public'),{maxAge: "365d"}))
    server.post('/api/v1/settings/clearCaches', adminAuthMiddleware, (req, res) => {
        apiCache.clear(req.params.collection)
        res.end()
    });
    server.get('/robots.txt', (req, res) => clientRobotTxtController(req, res));
    server.get('/manifest.json', cacheSuccesses,(req,res)=>{clientMainFestController(req,res)})
    //xml siteMap routes
    server.get('/sitemap.xsl', (req, res) => {return res.status(200).sendFile('sitemap.xsl', staticServeOptions)});
    server.get('/sitemap.xml', (req, res) => {siteMapController.siteMap(req , res)});
    server.get('/sitemap', (req, res) => {siteMapController.siteMap(req , res)});
    server.get('/sitemaps/:month', (req, res) => {siteMapsController.siteMapMonths(req , res)});
    server.get('/sitemap/:month/:pageNo', (req, res) => {subSiteMapsController.subSiteMapsController(req , res)});
    //api routes
    server.use('/api/admin',adminMainRouter);
    server.use('/api/v1',clientMainRouter);

    server.get('*', (req, res) => {
        return handle(req, res)
    });

}).catch((ex) => {
    console.log('exit error:', ex.stack)
});

// const credentials = process.env.REACT_APP_SSL === 'true' ? {
//     key: fs.readFileSync('./server/https/localhost-key.pem'),
//     cert: fs.readFileSync('./server/https/localhost.pem')
// } : {}