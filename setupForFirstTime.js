const mongoose = require("mongoose");
require('dotenv').config()
const settingSchema = require('./server/models/settings/settingSchema')
const widgetSchema = require('./server/models/settings/widgetSchema')
const postSchema = require('./server/models/postSchema')

const mongoDBConnectionUrl = process.env.DB_LOCAL ?
    `mongodb://localhost:${ process.env.DB_PORT }/${ process.env.DB_NAME }` :
    `mongodb://${ process.env.DB_USER }:${ process.env.DB_PASS }@${ process.env.DB_HOST }:${ process.env.DB_PORT }/${ process.env.DB_NAME }`

mongoose.connect(mongoDBConnectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('DB connected'))
    .catch(err => console.log('DB not connected', err));

//identity default setting
const identityData = {
    type: 'identity',
    data: {
        "siteAddress": '',
        "protocol": "http",
        "title": "just another React CMS website",
        "themeColor": "#000",
        "description": "website description",
        "keywords": [],
        "logoText": "Logo text",
        "headLine": "this is the site headline",
        "homePageH1": "H1",
        "homePagePagination": true,
        "postsCountPerPage": "40",
        "homePageSidebar": true,
        "categoriesPageSidebar": true,
        "tagsPageSidebar": true,
        "actorsPageSidebar": true,
        "postPageSidebar": true,
        "postsPageSidebar": true
    }
}

const navigationData = {
    type: 'navigation',
    data: [
        {
            "title": "Home",
            "url": "/"
        }
    ]
}

const designData = {
    type: 'design',
    data: {}
}

const runSetup = async () => {
    const identityToSave = new settingSchema(identityData)
    const navigationToSave = new settingSchema(navigationData)
    const designToSave = new settingSchema(designData)
    await identityToSave.save()
    await navigationToSave.save()
    await designToSave.save()
}

runSetup().then(() => {
    console.log('all set')
    process.exit()
}).catch(err => {
    console.log(err)
    process.exit()
})
