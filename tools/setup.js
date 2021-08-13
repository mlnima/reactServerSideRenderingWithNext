const mongoose = require('mongoose');
require('dotenv').config()
const settingSchema = require('../server/models/settings/settingSchema')
const widgetSchema = require('../server/models/settings/widgetSchema')
const postSchema = require('../server/models/postSchema')
const userSchema = require('../server/models/userSchema')
const bcrypt = require('bcryptjs');
require('../server/_variables/connectToDatabase')

// const mongoDBConnectionUrl = process.env.DB_LOCAL === 'true' ?
//     `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}` :
//     `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
//
// mongoose.connect(mongoDBConnectionUrl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//     .then(() => {)
//     .catch(err => console.log('DB not connected', err));

const identityData = {
    type: 'identity',
    data: {
        title: 'just another React CMS website',
        themeColor: '#000',
        postsCountPerPage: 40,
        description: 'website description',
        keywords: [],
        homePageSidebar: true,
        metaPageSidebar: false,
        postPageSidebar: true,
        postsPageSidebar: true,
        anyoneCanRegister: true,
        defaultSiteLanguage: 'en',
    }
}

const adminPanelData = {
    type: 'adminPanelSettings',
    data: {
        defaultPostType: 'standard'
    }
}

const identityToSave = new settingSchema(identityData)
identityToSave.save().catch(() => {

})

//saving default site design

const designData = {
    type: 'design',
    data: {
        customColors: `  
    --main-text-color: #fff;
    --main-red-color: #FF3565;
    --main-blue-color: #0073aa;
    --main-yellow-color: #f90;
    --main-dark-color:#1b1b1b;
    --background-color: #0e0e10;
    --post-page-info-color:#fff;
    --post-page-info-background-color:#181818;
    --meta-text-color:#000;
    --meta-background-color:#f90;
    --widget-h-f-text-color:#fff;
    --widget-h-f-background-color:transparent;
    --post-element-text-color:#fff;
    --post-element-background-color:transparent;

    --navigation-text-color: #fff;
    --navigation-background-color: #18181b;
    --topbar-background-color: #18181b;
    --sidebar-background-color : #1f1f23;
    --footer-background-color: #18181b;
    --header-background-color: #18181b ;

    --comment-author-color: #f90 ;
    --comment-date-color: #fff ;
    --comment-body-color: #fff ;

     --custom-green :#44d62c;`
    }
}

const siteDesignToSave = new settingSchema(designData)
siteDesignToSave.save().catch(err => {
    console.log(err)
})


//creating admin admin account


let adminData = {
    username: 'Admin',
    password: 'Admin',
    role: 'administrator',
    keyMaster: true
}

bcrypt.hash(adminData.password, 10, function (err, hash) {
    if (err) {
        console.log(err)
        process.exit()
    } else if (hash) {
        adminData = {...adminData, password: hash}
        const adminDataToSave = new userSchema(adminData)
        adminDataToSave.save()
        console.log('admin account created , username: Admin , password: Admin')
        setTimeout(() => process.exit(), 5000)
    }
});


//saving default widget for homepage


const widgetData = [{
    "data": {
        "type": "authentication",
        "position": "topBar",
        "pagination": false,
        "stayOpen": false
    }
},
    {
        "data": {
            "type": "logo",
            "position": "header",
            "LogoUrl": "",
            "LogoText": "Logo",
            "headLine": "",
        }
    }
]


widgetData.forEach(widget => {
    const dataToSave = new widgetSchema(widget)
    dataToSave.save().catch(err => {
        console.log(err)
        console.log('Error on widget set')
    })
})










