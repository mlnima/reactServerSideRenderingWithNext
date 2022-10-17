import dotenv from 'dotenv';
dotenv.config();
import connectToDatabase from '../expressServer/_variables/connectToDatabase';
connectToDatabase('Setup').finally()
import settingSchema from '../expressServer/models/settings/settingSchema';
import widgetSchema from '../expressServer/models/widgetSchema';

import userSchema from '../expressServer/models/userSchema';
import bcrypt from 'bcryptjs';



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
        footer : "enable",
        header : "enable",
        navigation : "enable",
        topbar : "enable",
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
:root{
    --main-text-color: #ccc;
    --main-background-color: #000;
//postpage
    --post-page-info-color:#ccc;
    --post-page-info-background-color:#181818;
//meta-widget-under posts
    --meta-text-color:#000;
    --meta-background-color:#f90;
//widgets
    --widget-header-footer-text-color:#fff;
    --widget-header-footer-background-color:transparent;
//postElement
    --post-element-text-color:#ccc;
    --post-element-info-text-color:#ccc;
    --post-element-background-color:#000;
//widgetAreas
    --topbar-text-color: #18181b;
    --topbar-background-color: #000;

    --header-text-color: #000;
    --header-background-color: #000;

    --navigation-text-color: #ccc;
    --navigation-background-color: #000;

    --sidebar-text-color : #18181b;
    --sidebar-background-color : #18181b;

    --footer-text-color: #18181b;
    --footer-background-color: #18181b;
//comments
    --comment-author-color: #f90 ;
    --comment-date-color: #fff ;
    --comment-body-color: #fff ;
//popup
--popup-text-color:#fff;
    --popup-outer-background-color:rgba(0,0,0,.6);
    --popup-background-color:#191919;
    --popup-header-color:#202020;

//activeColors
--main-active-color :#f90;  

//buttons
    --primary-button-link-background-color: #f90;
    --primary-button-link-text-color: #000;

    --secondary-button-link-background-color: #6c757d;
    --secondary-button-link-text-color: #fff;

    --success-button-link-background-color: #28a745;
    --success-button-link-text-color: #fff;

    --danger-button-link-background-color: #dc3545;
    --danger-button-link-text-color: #fff;

    --warning-button-link-background-color: #f90;
    --warning-button-link-text-color: #212529;

    --info-button-link-background-color: #117a8b;
    --info-button-link-text-color: #fff;

    --dark-button-link-background-color:#343a40;
    --dark-button-link-border-color: #343a40;
    --dark-button-link-text-color: #fff;

    --light-button-link-background-color:#f8f9fa;
    --light-button-link-border-color: #f8f9fa;
    --light-button-link-text-color: #212529;

//border
    --default-border-color : rgba(138,145,158,.5);
    --default-border : solid var(--default-border-color,#ccc) .5px;
    --default-box-sizing:   border-box;
}
 `
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










