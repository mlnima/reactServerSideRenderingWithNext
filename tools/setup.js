const mongoose = require('mongoose');
require('dotenv').config()
const settingSchema = require('../server/models/settings/settingSchema')
const widgetSchema = require('../server/models/widgetSchema')
const postSchema = require('../server/models/postSchema')
const userSchema = require('../server/models/userSchema')
const bcrypt = require('bcryptjs');
require('../server/_variables/connectToDatabase')

const identityData = {
    type: 'identity',
    data: {
        title: 'just another React CMS website',
        themeColor: '#000',
        postsCountPerPage: 40,
        description: 'website description',
        keywords: [],
        homePageSidebar: true,
        metaPageSidebar: true,
        postPageSidebar: true,
        postsPageSidebar: true,
        anyoneCanRegister: false,
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
    --main-text-color: #999;
    --background-color: #0e0e10;
    --post-page-info-color:#fff;
    --post-page-info-background-color:#181818;
    --meta-text-color:#000;
    --meta-background-color:#f90;
    --widget-h-f-text-color:#fff;
    --widget-h-f-background-color:transparent;
    --post-element-text-color:#999;
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

 `
    }
}

const siteDesignToSave = new settingSchema(designData)
siteDesignToSave.save().catch(err => {
    req.queryerr)
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










