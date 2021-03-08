
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
const path = require('path');
const authMiddleware = require('./server/middlewares/authMiddleware');
const adminAuthMiddleware = require('./server/middlewares/adminAuthMiddleware');
const apiRequestMiddleware = require('./server/middlewares/apiRequestMiddleware');
const xmlparser = require("express-xml-bodyparser");
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();
const apicache = require('apicache')
const LRUCache = require('lru-cache');
const compression = require('compression')
const cacheSuccesses = require('./server/middlewares/apiCache')
// const pageCache = require('./server/tools/pageCache')
mongoose.Promise = global.Promise;
const mongoDBConnectionUrl = process.env.DB_LOCAL === 'true' ?
    `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}` :
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

mongoose.connect(mongoDBConnectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('DB connected'))
    .catch(err => console.log('DB not connected', err));
//------------------------------------------------------------Page Cache --------------------------

console.log('env variables: ',process.env)



let ssrCache = new LRUCache({
    max: 4000 * 1024 * 1024, /* cache size will be 100 MB using `return n.length` as length() function */
    length: function (n, key) {
        return n
    },
    maxAge: 1000 * 60 * 60 * 24 * 30
});

let getCacheKey = (req) => {
    return `${req.path}`
}


let renderAndCache = async (req, res, targetComponent, queryParams) => {
    const key = getCacheKey(req);

    // If we have a page in the cache, let's serve it
    if (ssrCache.has(key)) {
        console.log('is cached')
        //console.log(`serving from cache ${key}`);
        res.setHeader('x-cache', 'HIT');
        res.send(ssrCache.get(key));
        // res.end()
        return
    } else {
        try {
            const html = await app.renderToHTML(req, res, targetComponent, queryParams);
            if (res.statusCode !== 200) {
                res.send(html);
                // res.end()
                return
            }
            ssrCache.set(key, html);
            res.setHeader('x-cache', 'MISS');
            res.send(html)
        } catch (err) {
            console.log(err)
            await app.renderError(err, req, res, targetComponent, queryParams)
        }
    }


}


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
    // server.get('/', (req, res) => {
    //     const targetComponent = '/';
    //     const queryParams = {
    //         ...req.query,
    //         ...req.params,
    //     }
    //
    //     return renderAndCache(req, res, targetComponent)
    // });

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

    server.post('/api/v1/posts/bulkAction', (req, res) => {
        postsControllers.bulkAction(req, res)
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
    server.post('/api/v1/settings/getSingleWidgetData', (req, res) => {
        settingsControllers.getSingleWidgetData(req, res)
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
    server.post('/api/v1/settings/clearCaches', adminAuthMiddleware, (req, res) => {
        apicache.clear(req.params.collection)
        ssrCache.reset()
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


//-------------------post----------------------

    const serverGetGenerator = ()=>{
        const routesArr =[
            {route:'/login',target:'/auth/login'},
            {route:'/:local/login',target:'/auth/login'},
            {route:'/register',target:'/auth/register'},
            {route:'/:local/register',target:'/auth/register'},

            {route:'/tags/:tag',target:'/posts',contentName:'tag'},
            {route:'/:local/tags/:tag',target:'/posts',contentName:'tag'},
            {route:'/categories/:category',target:'/posts',contentName:'category'},
            {route:'/:local/categories/:category',target:'/posts',contentName:'category'},
            {route:'/actors/:actor',target:'/posts',contentName:'actor'},
            {route:'/:local/actors/:actor',target:'/posts',contentName:'actor'},

            {route:'/posts',target:'/posts'},
            {route:'/:local/posts',target:'/posts'},

            {route:'/categories',target:'/meta',contentType: 'categories'},
            {route:'/:local/categories',target:'/meta',contentType: 'categories'},
            {route:'/tags',target:'/meta',contentType: 'tags'},
            {route:'/:local/tags',target:'/meta',contentType: 'tags'},
            {route:'/actors',target:'/meta',contentType: 'actors'},
            {route:'/:local/actors',target:'/meta',contentType: 'actors'},

            {route:'/post/:title',target:'/post'},
            {route:'/:local/post/:title',target:'/post'},
            {route:'/page/:pageName',target:'/page'},
            {route:'/:local/page/:pageName',target:'/page'},
            {route:'/profile',target:'/profile'},
            {route:'/:local/profile',target:'/profile'},
            {route:'/errorPage',target:'/errorPage'},
            {route:'/:local/errorPage',target:'/errorPage'}
            ]
        routesArr.map(routeObj=>{
            return  server.get(routeObj.route, (req, res) => {
                const targetComponent = routeObj.target;
                const specialDataForRoute = routeObj.contentName ?{contentName: req.params[routeObj.contentName]}:
                                            routeObj.contentType ? {contentType: routeObj.contentType}:{};

                const shouldCompress = (req, res)=> {
                    if (req.headers['x-no-compression']) {
                        return false
                    }
                    return compression.filter(req, res)
                }
                const queryParams = {
                    ...req.query,
                    ...req.params,
                    ...specialDataForRoute
                }
                server.use(compression({ filter: shouldCompress }))
                app.render(req, res, targetComponent, queryParams)
            });
        })

    }

    serverGetGenerator()

    server.get('/', (req, res) => {
        const targetComponent = '/';
        const queryParams = {
            ...req.query,
            ...req.params,
        }
        server.use(compression());
        app.render(req, res, targetComponent, queryParams)
        // return renderAndCache(req, res, targetComponent, queryParams)
    });




    // server.get('/tags/:tag', (req, res) => {
    //     const targetComponent = '/posts';
    //     const queryParams = {
    //         ...req.query,
    //         ...req.params,
    //         contentType: 'tags',
    //         contentName: req.params.tag,
    //     }
    //     app.render(req, res, targetComponent, queryParams)
    //     // return renderAndCache(req, res, targetComponent, queryParams)
    // });

    // server.get('/login', (req, res) => {
    //     const targetComponent = '/auth/login';
    //     const queryParams = {
    //         ...req.query,
    //         ...req.params,
    //     }
    //     app.render(req, res, targetComponent, queryParams)
    //     // return renderAndCache(req, res, targetComponent, queryParams)
    // });

    // server.get('/register', (req, res) => {
    //     const targetComponent = '/auth/register';
    //     const queryParams = {
    //         ...req.query,
    //         ...req.params,
    //     }
    //     app.render(req, res, targetComponent, queryParams)
    //     // return renderAndCache(req, res, targetComponent, queryParams)
    // });

    // server.get('/categories/:category', (req, res) => {
    //     const targetComponent = '/posts';
    //     const queryParams = {
    //         ...req.query,
    //         ...req.params,
    //         contentType: 'categories',
    //         contentName: req.params.category,
    //     }
    //     app.render(req, res, targetComponent, queryParams)
    //     // return renderAndCache(req, res, targetComponent, queryParams)
    // });

    // server.get('/actors/:actor', (req, res) => {
    //     const targetComponent = '/posts';
    //     const queryParams = {
    //         ...req.query,
    //         ...req.params,
    //         contentType: 'actors',
    //         contentName: req.params.actor,
    //     }
    //     app.render(req, res, targetComponent, queryParams)
    //     // return renderAndCache(req, res, targetComponent, queryParams)
    // });

    // server.get('/posts', (req, res) => {
    //     const targetComponent = '/posts';
    //     const queryParams = {
    //         ...req.query,
    //         ...req.params,
    //     }
    //     app.render(req, res, targetComponent, queryParams)
    //     // return renderAndCache(req, res, targetComponent, queryParams)
    // });

    // server.get('/categories', (req, res) => {
    //     const targetComponent = '/meta';
    //     const queryParams = {
    //         ...req.query,
    //         ...req.params,
    //         contentType: 'categories'
    //     }
    //     app.render(req, res, targetComponent, queryParams)
    //     // return renderAndCache(req, res, targetComponent, queryParams)
    // });
    // server.get('/tags', (req, res) => {
    //
    //     const targetComponent = '/meta';
    //     const queryParams = {
    //         ...req.query,
    //         ...req.params,
    //         contentType: 'tags'
    //     }
    //     app.render(req, res, targetComponent, queryParams)
    //     // return renderAndCache(req, res, targetComponent, queryParams)
    // });
    // server.get('/actors', (req, res) => {
    //     const targetComponent = '/meta';
    //     const queryParams = {
    //         ...req.query,
    //         ...req.params,
    //         contentType: 'actors'
    //     }
    //
    //     app.render(req, res, targetComponent, queryParams)
    //     // return renderAndCache(req, res, targetComponent, queryParams)
    // });

    // server.get('/post/:title', (req, res) => {
    //     const targetComponent = '/post';
    //     const queryParams = {
    //         ...req.query,
    //         ...req.params,
    //     }
    //     app.render(req, res, targetComponent, queryParams)
    //     // return renderAndCache(req, res, targetComponent, queryParams)
    // });

    // server.get('/page/:pageName', (req, res) => {
    //     const targetComponent = '/page';
    //     const queryParams = {
    //         ...req.query,
    //         ...req.params,
    //     }
    //     app.render(req, res, targetComponent, queryParams)
    //     // return renderAndCache(req, res, targetComponent, queryParams)
    // });

    // server.get('/profile', (req, res) => {
    //     const targetComponent = '/profile';
    //     const queryParams = {
    //         ...req.query,
    //         ...req.params,
    //     }
    //     app.render(req, res, targetComponent, queryParams)
    // });


    server.get('/admin/assets', (req, res) => {
        const targetComponent = '/admin/assets';
        const queryParams = {
            ...req.query,
            ...req.params,
        }
        app.render(req, res, targetComponent, queryParams)
        // return renderAndCache(req, res,targetComponent, queryParams)
    });

    server.get('/admin/pages', (req, res) => {
        const targetComponent = '/admin/pages';
        const queryParams = {
            ...req.query,
            ...req.params,
        }
        app.render(req, res, targetComponent, queryParams)
        // return renderAndCache(req, res,targetComponent, queryParams)
    });


    // server.get('/admin/page', (req, res) => {
    //     const targetComponent = '/admin/page';
    //     const queryParams = {
    //         ...req.query,
    //         ...req.params,
    //     }
    //     app.render(req, res, targetComponent, queryParams)
    //     // return renderAndCache(req, res,targetComponent, queryParams)
    // });


    // server.get('/errorPage', (req, res) => {
    //     const targetComponent = '/errorPage';
    //     app.render(req, res, targetComponent)
    // });

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


