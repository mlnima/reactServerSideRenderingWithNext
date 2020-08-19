const mongoose = require('mongoose');
require('dotenv').config()
const settingSchema = require('./server/models/settings/settingSchema')
const widgetSchema = require('./server/models/settings/widgetSchema')
const postSchema = require('./server/models/postSchema')
const userSchema = require('./server/models/userSchema')
const bcrypt = require('bcryptjs');

const mongoDBConnectionUrl = process.env.DB_LOCAL ?
    `mongodb://localhost:${ process.env.DB_PORT }/${ process.env.DB_NAME }` :
    `mongodb://${ process.env.DB_USER }:${ process.env.DB_PASS }@${ process.env.DB_HOST }:${ process.env.DB_PORT }/${ process.env.DB_NAME }`

mongoose.connect(mongoDBConnectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('DB connected'))
    .catch(err => console.log('DB not connected', err));


const identityData = {
    type: 'identity',
    data: {
        title: 'just another React CMS website',
        themeColor: '#000',
        postsCountPerPage: 40,
        description: 'website description',
        keywords: [],
        logoText: ' Logo text',
        headLine: 'this is the site headline',
        homePageSidebar: true,
        metaPageSidebar: false,
        postPageSidebar: true,
        postsPageSidebar: true,
        topBarAuthBtn:true,
        anyoneCanRegister:true,
        defaultSiteLanguage:'en',
        topBarVisibility:true,
    }
}
const navigationData = {
    type: 'navigation',
    data: [
        {
            "title": "Home",
            "url": "/"
        },
        {
            "title": "Tags",
            "url": "/meta",
            "as": "/tags",
            "query": [
                {
                    "type": "tags"
                }
            ]
        },
        {
            "title": "Categories",
            "url": "/meta",
            "as": "/categories",
            "query": [
                {
                    "type": "categories"
                }
            ]
        }
    ]
}
const designData = {
    type: 'design',
    data: {
        bodyBackgroundColor: 'black',
        bodyTextColor: 'white',
        topBarBackgroundColor: '#222222',
        topBarTextColor: 'white',
        headerBackgroundColor: 'transparent',
        headerTextColor: 'white',
        navigationBackgroundColor: '#222222',
        navigationTextColor: 'white',
        footerBackgroundColor: '#222',
        footerTextColor: 'black',

        widgetHeaderBackgroundColor: '#222',
        widgetHeaderTextColor: 'white',
        widgetHeaderRedirectLinkBackgroundColor: 'red',
        widgetHeaderRedirectLinkTextColor: '#fff',
        widgetBodyBackgroundColor: 'transparent',
        widgetBodyTextColor: '#fff',
        widgetBodyBorder: 'none',

        commentsAuthorTextColor: '#0085ba',
        commentsDateTextColor: '#FF3565',
        commentsBodyTextColor: '#fff',
        commentsBackgroundColor: 'transparent',
    }
}

const adminData = {
    username: 'Admin',
    password: 'Admin',
    role: 'administrator',
    keyMaster:true
}

const widgetData = [ {
    "data": {
        "type": "searchBar",
        "title": "",
        "categories": [],
        "tags": [],
        "count": 8,
        "comments": [],
        "pagination": false,
        "position": "header",
        "redirectLink": "",
        "sortBy": "",
        "text": "",
        "textAlign": "center",
        "customHtml": "",
        "metaType": "",
        "pathURL": "",
        "LogoUrl": "",
        "LogoText": "",
        "headLine": "",
        "viewType": "standard"
    }
},
    {
        "data": {
            "type": "logo",
            "title": "",
            "categories": [],
            "tags": [],
            "count": 8,
            "comments": [],
            "pagination": false,
            "position": "header",
            "redirectLink": "",
            "sortBy": "",
            "text": "",
            "textAlign": "center",
            "customHtml": "",
            "metaType": "",
            "pathURL": "",
            "LogoUrl": "",
            "LogoText": "Logo",
            "headLine": "",
            "viewType": "standard",
            "metaData": [],
            "posts": [],
            "logoTextColor" : "white",
            "logoHeadLineColor" : "white",
            "logoHeadLineFontSize" : "26",
            "logoTextFontSize" : "40"
        }
    }
]

const runSetup = async () => {
    const identityToSave = new settingSchema(identityData)
    const navigationToSave = new settingSchema(navigationData)
    const designToSave = new settingSchema(designData)

    await identityToSave.save()
    await navigationToSave.save()
    await designToSave.save()

    widgetData.forEach(widget => {
        const dataToSave = new widgetSchema(widget)
        dataToSave.save()
    })

    bcrypt.hash(adminData.password, 10, (err, hash) => {
        if (err) {
            console.log('something is wrong with Bcrypt')
        } else if (hash) {
            let dataToSave = {
                ...adminData,
                password: hash,
            };

            let newUserData = userSchema(dataToSave);
            newUserData.save()
        }
    })

}

runSetup().then(() => {
    console.log('all set')
    process.exit()
}).catch(err => {
    console.log(err)
    process.exit()
})

