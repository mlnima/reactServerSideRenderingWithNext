const express = require('express');
const next = require('next');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const userController = require('./server/controllers/userControllers');
const postsControllers = require('./server/controllers/postsControllers');
const siteMapController = require('./server/controllers/siteMapController');
const siteMapsController = require('./server/controllers/siteMapsController');
const subSiteMapsController = require('./server/controllers/subSiteMapsController');
const settingsControllers = require('./server/controllers/settingsControllers');
const fileManagerControllers = require('./server/controllers/fileManagerControllers');
const pageControllers = require('./server/controllers/pageControllers');
const formController = require('./server/controllers/formController');
const apiPostControllers = require('./server/controllers/apiControllers/apiPostsControllers');
const youtubeDataScrapper = require('./server/dataScrappers/youtube');
const paymentControllers = require('./server/controllers/paymentControllers');
const path = require('path');
const authMiddleware = require('./server/middlewares/authMiddleware');
const adminAuthMiddleware = require('./server/middlewares/adminAuthMiddleware');
const apiRequestMiddleware = require('./server/middlewares/apiRequestMiddleware');
const xmlparser = require("express-xml-bodyparser");
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();
const apicache = require('apicache')
const compression = require('compression')
//cache page

const normalizeUrl = require('normalize-url');
const {resolve: urlResolve} = require('url');
const Keyv = require('keyv');
//cache api
const cacheSuccesses = require('./server/middlewares/apiCache')
const cors = require('cors')
require('dotenv').config()
//const cacheableResponse = require('cacheable-response')


// const pageCache = require('./server/tools/pageCache')
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
//------------------------------------------------------------Page Cache doesnt work ok--------------------------

//-------------------------------------------------------------------------------------------------
const robotsOptions = {
    root: './static/',
    headers: {'Content-Type': 'text/plain;charset=utf-8'}
}

const PORT = process.env.REACT_APP_PORT || 3000;
app.prepare().then(() => {
    const server = express();
    server.use(cookieParser());
    server.use(fileUpload());
    server.use(bodyParser.json());
    server.use(xmlparser());
  //  server.use(cors())

    //-------------------
    server.use('/static', express.static(path.join(__dirname, 'static')))
    //--------------------
    server.get('/robots.txt', (req, res) => {
        res.set('Content-Type', 'text/plain;charset=utf-8');
        const robotTxtData = `User-agent: *
Disallow: /admin
Sitemap: ${process.env.PRODUCTION_URL}/sitemap.xml
`
        res.send(robotTxtData);
        res.end()

    });

    //xml siteMap handler
    server.get('/sitemap.xsl', (req, res) => {
        return res.status(200).sendFile('sitemap.xsl', robotsOptions)
    });
    server.get('/sitemap.xml', (req, res) => {
        siteMapController.siteMap(req, res)
    });
    server.get('/sitemaps/:month', (req, res) => {
        siteMapsController.siteMapMonths(req, res)
    });
    server.get('/sitemap/:month/:pageNo', (req, res) => {
        subSiteMapsController.siteMap(req, res)
    });

    //users handler
    server.post('/api/v1/users/register', (req, res) => {
        userController.register(req, res)
    });
    server.post('/api/v1/users/login', (req, res) => {
        userController.login(req, res)
    });
    server.post('/api/v1/users/resetPassword', authMiddleware, (req, res) => {
        userController.resetPassword(req, res)
    });
    server.post('/api/v1/users/getUserInfo', authMiddleware, (req, res) => {
        userController.getUserInfo(req, res)
    });
    server.post('/api/v1/users/getUserData', authMiddleware, (req, res) => {
        userController.getUserData(req, res)
    });
    // server.post('/api/v1/users/getMyProfileData',authMiddleware,(req,res)=>{userController.getMyProfileData(req,res)});
    server.post('/api/v1/users/updateUserData', adminAuthMiddleware, (req, res) => {
        userController.updateUserData(req, res)
    });
    server.post('/api/v1/users/getUsersList', (req, res) => {
        userController.getUsersList(req, res)
    });
    server.post('/api/v1/users/getUsersListAsAdmin', adminAuthMiddleware, (req, res) => {
        userController.getUsersListAsAdmin(req, res)
    });
    server.post('/api/v1/users/newAPIKey', adminAuthMiddleware, (req, res) => {
        userController.newAPIKey(req, res)
    });

    //posts handler
    // server.post('/api/v1/posts',authMiddleware,(req,res)=>{postsControllers.getPostsInfo(req,res)});
    server.post('/api/v1/posts',cacheSuccesses, (req, res) => {
        //need to be cache id page cache doesnt work
        //cacheSuccesses
        postsControllers.getPostsInfo(req, res)
    });
    server.post('/api/v1/posts/post',cacheSuccesses, (req, res) => {
        //need to be cache id page cache doesnt work
        postsControllers.getPostInfo(req, res)
    });
    server.post('/api/v1/posts/createNewPost', async (req, res) => {
        await postsControllers.createNewPost(req, res)
    });
    server.post('/api/v1/posts/updatePost', (req, res) => {
        postsControllers.updatePost(req, res)
    });
    server.post('/api/v1/posts/deletePost', (req, res) => {
        postsControllers.deletePost(req, res)
    });
    server.post('/api/v1/posts/postsBulkAction', (req, res) => {
        postsControllers.postsBulkAction(req, res)
    });
    server.post('/api/v1/posts/likeDislikeView', (req, res) => {
        postsControllers.likeDislikeView(req, res)
    });

    server.post('/api/v1/posts/bulkAction', (req, res) => {
        postsControllers.bulkAction(req, res)
    });
    server.post('/api/v1/posts/checkRemovedContent', (req, res) => {
        postsControllers.checkRemovedContent(req, res)
    });


    //meta data handler(tags,categories...)
    server.post('/api/v1/posts/getMeta',cacheSuccesses, (req, res) => {
        //need to be cache id page cache doesnt work
        postsControllers.getMeta(req, res)
    });
    server.post('/api/v1/posts/getSingleMeta', (req, res) => {
        //need to be cache id page cache doesnt work
        postsControllers.getSingleMeta(req, res)
    });
    server.post('/api/v1/posts/updateMeta', (req, res) => {
        postsControllers.updateMeta(req, res)
    });
    server.post('/api/v1/posts/deleteMeta', adminAuthMiddleware, (req, res) => {
        //need to be cache id page cache doesnt work
        postsControllers.deleteMeta(req, res)
    });

    //comments handler
    server.post('/api/v1/posts/newComment', (req, res) => {
        postsControllers.newComment(req, res)
    });
    server.post('/api/v1/posts/getComments', (req, res) => {
        postsControllers.getComments(req, res)
    });
    server.post('/api/v1/posts/updateComment', (req, res) => {
        postsControllers.updateComment(req, res)
    });
    server.post('/api/v1/posts/deleteComments', (req, res) => {
        postsControllers.deleteComments(req, res)
    });

    //settings handler
    server.post('/api/v1/settings/update', (req, res) => {
        settingsControllers.update(req, res)
    });
    server.post('/api/v1/settings/get', (req, res) => {
        settingsControllers.get(req, res)
    });
    server.post('/api/v1/settings/getMultiple',cacheSuccesses, (req, res) => {
        //need to be cache id page cache doesnt work
        //cacheSuccesses
        settingsControllers.getMultiple(req, res)
    });
    server.post('/api/v1/settings/addWidget', (req, res) => {
        settingsControllers.addWidget(req, res)
    });
    server.post('/api/v1/settings/getSingleWidgetData', (req, res) => {
        settingsControllers.getSingleWidgetData(req, res)
    });
    server.post('/api/v1/settings/getWidget', (req, res) => {
        settingsControllers.getWidget(req, res)
    });

    //cacheSuccesses
    server.post('/api/v1/settings/getMultipleWidgetWithData',cacheSuccesses, (req, res) => {
        // console.log(req.body)
        //need to be cache id page cache doesnt work
        //cacheSuccesses
        settingsControllers.getMultipleWidgetWithData(req, res)
    });



    server.post('/api/v1/settings/getWidgetsWithData',cacheSuccesses, (req, res) => {
        //need to be cache id page cache doesnt work
        //cacheSuccesses
        settingsControllers.getWidgetsWithData(req, res)
    });
    server.post('/api/v1/settings/updateWidget', (req, res) => {
        settingsControllers.updateWidget(req, res)
    });
    server.post('/api/v1/settings/deleteWidget', (req, res) => {
        settingsControllers.deleteWidget(req, res)
    });
    server.post('/api/v1/settings/saveCustomStyle', (req, res) => {
        settingsControllers.saveCustomStyle(req, res)
    });
    //exe commands
    server.post('/api/v1/settings/executor', (req, res) => {
        settingsControllers.executor(req, res)
    });
    //cache control
    server.post('/api/v1/settings/clearCaches', adminAuthMiddleware, (req, res) => {
        apicache.clear(req.params.collection)
        // clearCompleteCache()
        res.end()
    });

    //form
    server.post('/api/v1/form/contact', (req, res) => formController.contact(req, res));
    server.post('/api/v1/forms/save', (req, res) => formController.widgetForm(req, res));
    server.post('/api/v1/forms/get', (req, res) => formController.getFormsData(req, res));
    server.post('/api/v1/forms/getFormData', (req, res) => formController.getFormData(req, res));

    //page
    server.post('/api/v1/pages/new', (req, res) => pageControllers.new(req, res));
    server.post('/api/v1/pages/update', (req, res) => pageControllers.update(req, res));
    server.post('/api/v1/pages/getPageData', (req, res) => pageControllers.getPageData(req, res));
    server.post('/api/v1/pages/getPagesData', (req, res) => pageControllers.getPagesData(req, res));
    server.post('/api/v1/pages/deletePage', (req, res) => pageControllers.deletePage(req, res));

    // file manager
    server.post('/api/v1/settings/fileManagerControllers-readPath', (req, res) => {
        fileManagerControllers.readPath(req, res)
    });
    server.post('/api/v1/settings/fileManagerControllers-readFile', (req, res) => {
        fileManagerControllers.readFile(req, res)
    });
    server.post('/api/v1/settings/fileManagerControllers-deleteFile', (req, res) => {
        fileManagerControllers.deleteFile(req, res)
    });
    server.post('/api/v1/settings/fileManagerControllers-uploadFile', (req, res) => {
        fileManagerControllers.uploadFile(req, res)
    });
    server.post('/api/v1/settings/fileManagerControllers-postThumbnailsUpload', (req, res) => {
        fileManagerControllers.postThumbnailsUpload(req, res)
    });
    server.post('/api/v1/settings/fileManagerControllers-uploadFiles', (req, res) => {
        fileManagerControllers.uploadFiles(req, res)
    });
    //need auth
    server.post('/api/v1/settings/fileManagerControllers-userImageUpload', authMiddleware, (req, res) => {
        fileManagerControllers.userImageUpload(req, res)
    });

    //API
    server.post('/api/v1/posts/createNewByApi', apiRequestMiddleware, (req, res) => {
        apiPostControllers.creatPost(req, res)
    });

    //data scrapper
    server.post('/api/v1/scrap/youtube', adminAuthMiddleware, (req, res) => {
        youtubeDataScrapper.gettingInfo(req, res)
    });

    //exporter
    server.post('/api/v1/posts/export', (req, res) => {
        postsControllers.export(req, res)
    });

    //payments
    server.post('/api/v1/order/create/payPal', (req, res) => {
        paymentControllers.order_payPal(req, res)
    });
    server.post('/api/v1/order/get',adminAuthMiddleware, (req, res) => {
        paymentControllers.getOrders(req, res)
    });


//!!!!!!!caching issue : caching cause page refresh on route change
    //const languages = process.env.REACT_APP_LOCALS.replace(' ','|')
  // server.get(`/:locale(${languages})?`, (req, res) => cacheManager({ req, res,pagePath:'/',queryParams:{...req.query,...req.params} }))
    // server.get(`/:locale(${languages})?`, (req, res) => ssrCache({ req, res }))
    // server.get('/', (req, res) => {
    //     const parsedUrl = parse(req.url, true)
    //     return handle(req, res, parsedUrl)
    // })

    server.get('*', (req, res) => {
        return handle(req, res)
    });

    server.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`server run on ${PORT}`)
    })
}).catch((ex) => {
    console.log('exit error:', ex.stack)
});


