const express = require('express');
const next = require('next');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const adminUsersRouter = require('./server/controllers/adminControllers/adminUsersRouter');
const adminSettingsRouter = require('./server/controllers/adminControllers/adminSettingsRouter');
const adminPostsRouter = require('./server/controllers/adminControllers/adminPostsRouter');
const adminWidgetsRouter = require('./server/controllers/adminControllers/adminWidgetsRouter');
const adminTerminalRouter = require('./server/controllers/adminControllers/adminTerminalRouter');
const adminFileManagerRouter = require('./server/controllers/adminControllers/adminFileManagerRouter');
const adminPagesRouter = require('./server/controllers/adminControllers/adminPagesRouter');
const adminFormsRouter = require('./server/controllers/adminControllers/adminFormsRouter');

const clientUsersRouter = require('./server/controllers/clientControllers/clientUsersRouter');
const clientSettingsRouter = require('./server/controllers/clientControllers/clientSettingsRouter');
const clientPostsRouter = require('./server/controllers/clientControllers/clientPostsRouter');
const clientWidgetsRouter = require('./server/controllers/clientControllers/clientWidgetsRouter');
const clientMainFestController = require('./server/controllers/clientControllers/clientMainFestController');
const clientRobotTxtController = require('./server/controllers/clientControllers/clientRobotTxtController');
const clientFileManagerRouter = require('./server/controllers/clientControllers/clientFileManagerRouter');
const clientPagesRouter = require('./server/controllers/clientControllers/clientPagesRouter');
const clientFormsRouter = require('./server/controllers/clientControllers/clientFormsRouter');

const siteMapController = require('./server/controllers/siteMapController');
const siteMapsController = require('./server/controllers/siteMapsController');
const subSiteMapsController = require('./server/controllers/subSiteMapsController');

//const pageControllers = require('./server/controllers/pageControllers');

const youtubeDataScrapper = require('./server/dataScrappers/youtube');
const paymentControllers = require('./server/controllers/paymentControllers');
const path = require('path');
const authMiddleware = require('./server/middlewares/authMiddleware');
const adminAuthMiddleware = require('./server/middlewares/adminAuthMiddleware');

const xmlparser = require("express-xml-bodyparser");
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();
const apicache = require('apicache')
const compression = require('compression')
require('dotenv').config()
const cors = require('cors')

//cache api
const cacheSuccesses = require('./server/middlewares/apiCache')



mongoose.Promise = global.Promise;
const mongoDBConnectionUrl = process.env.DB_LOCAL === 'true' ?
    `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}` :
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

mongoose.connect(mongoDBConnectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})
    .then(() => console.log('DB connected'))
    .catch(err => console.log('DB not connected', err));
//------------------------------------------------------------Page Cache doesnt work well--------------------------

const robotsOptions = {
    root: './static/',
    headers: {'Content-Type': 'text/plain;charset=utf-8'}
}

const PORT = process.env.REACT_APP_PORT || 3000;

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        return false
    }
    return compression.filter(req, res)
}

// const credentials = process.env.REACT_APP_SSL === 'true' ? {
//     key: fs.readFileSync('./server/https/localhost-key.pem'),
//     cert: fs.readFileSync('./server/https/localhost.pem')
// } : {}

app.prepare().then(() => {
    const server = express();
    server.use(cors())

    server.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`server run on ${PORT}`)
    })

    server.use(cookieParser());
    server.use(fileUpload());
    server.use(bodyParser.json());
    server.use(xmlparser());
    server.use(compression({filter: shouldCompress}));
    server.use('/static', express.static(path.join(__dirname, 'static'),{maxAge: "365d"}))

    server.post('/api/v1/settings/clearCaches', adminAuthMiddleware, (req, res) => {
        apicache.clear(req.params.collection)
        res.end()
    });

    server.get('/robots.txt', (req, res) => clientRobotTxtController(req, res));
    server.get('/manifest.json', cacheSuccesses,(req,res)=>{clientMainFestController(req,res)})
    //xml siteMap handler
    server.get('/sitemap.xsl', (req, res) => {return res.status(200).sendFile('sitemap.xsl', robotsOptions)});
    server.get('/sitemap.xml', (req, res) => {siteMapController.siteMap(req , res)});
    server.get('/sitemaps/:month', (req, res) => {siteMapsController.siteMapMonths(req , res)});
    server.get('/sitemap/:month/:pageNo', (req, res) => {subSiteMapsController.siteMap(req , res)});

    server.use('/api/admin/users',adminUsersRouter);
    server.use('/api/admin/posts',adminPostsRouter);
    server.use('/api/admin/settings',adminSettingsRouter);
    server.use('/api/admin/widgets',adminWidgetsRouter);
    server.use('/api/admin/terminal',adminTerminalRouter);
    server.use('/api/admin/fileManager',adminFileManagerRouter);
    server.use('/api/admin/pages',adminPagesRouter);
    server.use('/api/admin/forms',adminFormsRouter);

    server.use('/api/v1/users',clientUsersRouter);
    server.use('/api/v1/posts',clientPostsRouter);
    server.use('/api/v1/settings',clientSettingsRouter);
    server.use('/api/v1/widgets',clientWidgetsRouter);
    server.use('/api/v1/fileManager',clientFileManagerRouter);
    server.use('/api/v1/pages',clientPagesRouter);
    server.use('/api/v1/forms',clientFormsRouter);

    //data scrapper
    server.post('/api/v1/scrap/youtube', adminAuthMiddleware, (req, res) => {
        youtubeDataScrapper.gettingInfo(req, res)
    });

    //payments
    server.post('/api/v1/order/create/payPal', (req, res) => {
        paymentControllers.order_payPal(req, res)
    });
    server.post('/api/v1/order/get', adminAuthMiddleware, (req, res) => {
        paymentControllers.getOrders(req, res)
    });
//------------------------------- custom routes ---------------------------------

    server.get('*', (req, res) => {
        return handle(req, res)
    });



}).catch((ex) => {
    console.log('exit error:', ex.stack)
});


