const mongoose = require('mongoose');
require('dotenv').config()
const settingSchema = require('./server/models/settings/settingSchema')
const widgetSchema = require('./server/models/settings/widgetSchema')
const postSchema = require('./server/models/postSchema')
const userSchema = require('./server/models/userSchema')
const bcrypt = require('bcryptjs');

const mongoDBConnectionUrl = process.env.DB_LOCAL === 'true' ?
    `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}` :
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

mongoose.connect(mongoDBConnectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('DB connected'))
    .catch(err => console.log('DB not connected', err));

//saving default site identity
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
        topBarAuthBtn: true,
        anyoneCanRegister: true,
        defaultSiteLanguage: 'en',
        topBarVisibility: true,
    }
}

const identityToSave = new settingSchema(identityData)
identityToSave.save().catch(() => {
    console.log('Error on site Identity set')
})

//saving default site design

const designData = {
    type: 'design',
    data: {
        customStyle: ' body{\n' +
            '    background-color: black;\n' +
            '    color: white;\n' +
            '}',
        topBarStyle:'background-color:#333;',
        headerStyle:'background-color:black;',
        navigationStyle:'background-color:#333;',
        footerStyle:'background-color:#333;',
    }
}

const sideDesignToSave = new settingSchema(designData)
sideDesignToSave.save().catch(() => {
    console.log('Error on site Identity set')
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
        "type": "searchBar",
        "title": "",
        "position": "header",
        "redirectLink": "",
        "text": "",
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
    dataToSave.save().catch(() => {
        console.log('Error on widget set')
    })
})










