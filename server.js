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
const apiPostControllers = require('./server/controllers/apiControllers/apiPostsControllers');
const youtubeDataScrapper = require('./server/dataScrappers/youtube');
const path = require('path');
const authMiddleware = require('./server/middlewares/authMiddleware');
const adminAuthMiddleware = require('./server/middlewares/adminAuthMiddleware');
const apiRequestMiddleware = require('./server/middlewares/apiRequestMiddleware');

const xmlparser = require("express-xml-bodyparser");
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();
const apicache = require('apicache')
const cacheableResponse = require('cacheable-response')
//cache api

const cache = apicache.middleware;

const cacheOn = (req, res) => {
    return res.statusCode === 200 && req.body.cache;
}
const cacheForceOn = (req, res) => {
    return res.statusCode === 200;
}
const cacheSuccesses = cache('1 day', cacheOn);
const cacheForce = cache('1 day', cacheForceOn);
mongoose.Promise = global.Promise;
//--
//cache app
const ssrCache = cacheableResponse({
    ttl: 1000 * 60 * 60, // 1hour
    get: async ({req, res}) => {
        const data = await app.renderToHTML(req, res, req.path, {
            ...req.query,
            ...req.params,
        })
        if (res.statusCode === 404) {
            res.end(data)
            return
        }

        return {data}
    },
    send: ({data, res}) => res.send(data),
})

const cacheWithTargetComponent = (req, res, path) => {
    cacheableResponse({
        ttl: 1000 * 60 * 60, // 1hour
        get: async ({req, res}) => {
            const data = await app.render(req, res, path, {
                ...req.query,
                ...req.params,
            })
            if (res.statusCode === 404) {
                res.end(data)
                return
            }

            return {data}
        },
        send: ({data, res}) => res.send(data),
    })
}


//--

const mongoDBConnectionUrl = process.env.DB_LOCAL ?
    `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}` :
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

mongoose.connect(mongoDBConnectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('DB connected'))
    .catch(err => console.log('DB not connected', err));

//Issue with __dirname
const robotsOptions = {
    root: './static/',
    headers: {'Content-Type': 'text/plain;charset=utf-8'}
}

const PORT = process.env.REACT_APP_PORT || 3000;
app.prepare().then(() => {
    const server = express();
    server.use(cookieParser());
    server.use(fileUpload());
    // server.use(fileUpload({
    //     useTempFiles: true,
    //     tempFileDir: './tmp/'
    // }));
    server.use(bodyParser.json());
    server.use(xmlparser());
    //-------------------
    server.use('/static', express.static(path.join(__dirname, 'static')))
    //--------------------
    server.get('/robots.txt', (req, res) => {
        return res.status(200).sendFile('robots.txt', robotsOptions)
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
    server.post('/api/v1/posts', (req, res) => {
        postsControllers.getPostsInfo(req, res)
    });
    server.post('/api/v1/posts/post', cacheSuccesses, (req, res) => {
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

    //meta data handler(tags,categories...)
    server.post('/api/v1/posts/getMeta', cacheSuccesses, (req, res) => {
        postsControllers.getMeta(req, res)
    });
    server.post('/api/v1/posts/getSingleMeta', cacheSuccesses, (req, res) => {
        postsControllers.getSingleMeta(req, res)
    });
    server.post('/api/v1/posts/updateMeta', (req, res) => {
        postsControllers.updateMeta(req, res)
    });
    server.post('/api/v1/posts/deleteMeta', adminAuthMiddleware, cacheSuccesses, (req, res) => {
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
    server.post('/api/v1/settings/getMultiple', cacheSuccesses, (req, res) => {
        settingsControllers.getMultiple(req, res)
    });
    server.post('/api/v1/settings/addWidget', (req, res) => {
        settingsControllers.addWidget(req, res)
    });
    server.post('/api/v1/settings/getWidget', (req, res) => {
        settingsControllers.getWidget(req, res)
    });
    server.post('/api/v1/settings/getMultipleWidgetWithData', cacheSuccesses, (req, res) => {
        settingsControllers.getMultipleWidgetWithData(req, res)
    });
    server.post('/api/v1/settings/getWidgetsWithData', cacheSuccesses, (req, res) => {
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
    server.post('/api/v1/settings/clearCaches', (req, res) => {
        apicache.clear(req.params.collection)
        res.end()
        // console.log(ssrCache)
        // settingsControllers.clearCaches(req,res)
    });
    // file manager
    server.post('/api/v1/settings/fileManagerControllers-readPath', (req, res) => {
        fileManagerControllers.readPath(req, res)
    });
    server.post('/api/v1/settings/fileManagerControllers-readFile', (req, res) => {
        fileManagerControllers.readFile(req, res)
    });
    server.post('/api/v1/settings/fileManagerControllers-uploadFile', (req, res) => {
        fileManagerControllers.uploadFile(req, res)
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


//-------------------post----------------------

    server.get('/tags/:tag', (req, res) => {
        const targetComponent = '/posts';
        const queryParams = {
            ...req.query,
            ...req.params,
            contentType: 'tags',
            contentName: req.params.tag,
        }
        app.render(req, res, targetComponent, queryParams)
    });

    server.get('/login', (req, res) => {
        const targetComponent = '/auth/login';
        const queryParams = {
            ...req.query,
            ...req.params,
        }
        app.render(req, res, targetComponent, queryParams)
    });

    server.get('/register', (req, res) => {
        const targetComponent = '/auth/register';
        const queryParams = {
            ...req.query,
            ...req.params,
        }
        app.render(req, res, targetComponent, queryParams)
    });


    server.get('/categories/:category', (req, res) => {
        const targetComponent = '/posts';
        const queryParams = {
            ...req.query,
            ...req.params,
            contentType: 'categories',
            contentName: req.params.category,
        }
        app.render(req, res, targetComponent, queryParams)
    });


    server.get('/actors/:actor', (req, res) => {
        const targetComponent = '/posts';
        const queryParams = {
            ...req.query,
            ...req.params,
            contentType: 'actors',
            contentName: req.params.actor,
        }
        app.render(req, res, targetComponent, queryParams)
    });

    server.get('/posts', (req, res) => {
        const targetComponent = '/posts';
        const queryParams = {
            ...req.query,
            ...req.params,
        }
        app.render(req, res, targetComponent, queryParams)
    });


    server.get('/categories', (req, res) => {
        const targetComponent = '/meta';
        const queryParams = {
            ...req.query,
            ...req.params,
            contentType: 'categories'
        }
        app.render(req, res, targetComponent, queryParams)
    });
    server.get('/tags', (req, res) => {
        const targetComponent = '/meta';
        const queryParams = {
            ...req.query,
            ...req.params,
            contentType: 'tags'
        }
        app.render(req, res, targetComponent, queryParams)
    });
    server.get('/actors', (req, res) => {
        const targetComponent = '/meta';
        const queryParams = {
            ...req.query,
            ...req.params,
            contentType: 'actors'
        }
        app.render(req, res, targetComponent, queryParams)
    });


    server.get('/post/:title', (req, res) => {
        const targetComponent = '/post';

        const params = {
            ...req.query,
            ...req.params,
        }
        app.render(req, res, targetComponent, params)
    });

    server.get('/profile', (req, res) => {
        const targetComponent = '/profile';
        const queryParams = {
            username: req.query.username,
            size: req.query.size,
            pageNo: req.query.pageNo,
            postType: req.query.postType,
            keyword: req.query.keyword,
            tab: req.query.author,
            sort: req.query.sort,
        }
        app.render(req, res, targetComponent, queryParams)
    });


    server.get('/admin/assets', (req, res) => {
        const targetComponent = '/admin/assets';
        const queryParams = {
            type: req.query.type,
            status: req.query.status,
            assetsType: req.query.assetsType,
            metaType: req.query.metaType,
            sort: req.query.sort,
            page: req.query.page,
            keyword: req.query.keyword,
            size: req.query.size,
            author: req.query.author,
        }
        app.render(req, res, targetComponent, queryParams)
    });

    server.get('/errorPage', (req, res) => {
        const targetComponent = '/errorPage';
        app.render(req, res, targetComponent)
    });

    // server.get('/meta', (req, res) => {
    //     const targetComponent = '/meta';
    //     const queryParams = {
    //         type: req.query.type,
    //         sort: req.query.sort,
    //         startWith: req.query.startWith,
    //         page: req.query.page,
    //         keyword: req.query.keyword ,
    //         size: req.query.size,
    //         lang: req.query.lang
    //     }
    //     app.render(req, res, targetComponent, queryParams,)
    // });

    // server.get('/', (req, res) => ssrCache({req, res}));

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


